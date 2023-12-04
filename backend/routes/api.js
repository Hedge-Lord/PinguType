const express = require('express');
const Account = require('../models/account');
const Score = require('../models/score');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('../strategies/passport')


router.post('/register', async (req, res, next) => {
    try {
      const existingUser = await Account.findOne({ username: req.body.username });
  
      if (existingUser) {
        console.log('Username already exists.');
        res.json({ error: 'Username already exists.' });
      } else {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAccount = await Account.create({
          username: req.body.username,
          password: hashedPassword,
        });
        console.log('Account created:', newAccount);
        res.json(newAccount);
      }
    } catch (err) {
      console.error(err);
      res.json({ error: 'Something went wrong when creating your account.' });
    }
  });
  
  router.post('/login', async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
          }
          if (!user) {
            return res.status(401).json({ success: false, message: 'Login failed' });
          }
          req.logIn(user, (err) => {
            if (err) {
              return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }
            return res.status(200).json({ success: true, message: 'Login successful' });
          });
        })(req, res, next);
  });
  
  router.post('/scores', (req, res, next) => {
    const { wpm, acc, difficulty } = req.body;
    const username = req.session.username; // Get the username from the session
    console.log("while typing, acc is ", username);
    // Find the account with the specified username
    Account.findOne({ username })
      .then(account => {
        if (!account) {
          throw new Error('Account not found');
        }
  
        // Add the new score to the scores array
        account.scores.push({
          wpm: wpm,
          acc: acc,
          date: new Date(),
          difficulty: difficulty
        });
  
        // Save the updated account
        return account.save();
      })
      .then(savedAccount => {
        console.log('Score saved successfully:', savedAccount);
        res.json({ success: true });
      })
      .catch(err => {
        console.error('Error saving score:', err);
        res.status(500).json({ error: 'Error saving score' });
      });
  });

  router.get("/check-auth", (req, res, next) => {
    try {
        if(req.user) res.json({auth: true});
        else res.json({auth: false});
    }
    catch(err) {
        return next(err);
    }
  });

module.exports = router;