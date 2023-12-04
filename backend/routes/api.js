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

  router.get("/check-auth", (req, res, next) => {
    try {
        if(req.user) res.json({auth: true});
        else res.json({auth: false});
    }
    catch(err) {
        return next(err);
    }
  });

  router.get("/get-user-id", async (req, res, next) => {
    try {
        if(req.user) {
          const user = await Account.findOne({username: req.user.username}).exec();
          res.json({user_id: user._id});
        }
        else res.json({user_id: null});
    }
    catch(err) {
        return next(err);
    }
  });
  
  router.post('/scores', (req, res, next) => {
    const wpm = req.body.wpm;
    const accuracy = req.body.accuracy;
    const difficulty = req.body.difficulty;
    const user = req.body.user_id;

    console.log("saving score to uid ", user);
    Score.create({
      date: new Date(), 
      wpm: wpm, 
      acc: accuracy, 
      difficulty: difficulty, 
      user: user})
    .then(newScore => {
      console.log("Score saved successfully: ", newScore);
      res.json({ success: true });
    })
    .catch(err => {
      console.error('Error saving score:', err);
      res.status(500).json({ error: 'Error saving score' });
    })
  });

  router.get('/scores', async (req, res, next) => {
    if (req.user) {
      const user = await Account.findOne({username: req.user.username}).exec();
      const scores = await Score.find({user: user._id}).exec();
      console.log(scores);
      res.json({scores});
    }
    else res.json({scores: []});
  });

module.exports = router;