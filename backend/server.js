const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Account = require('./models/account.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
/*
USE THIS GENERAL TEMPLATE TO SAVE USER INFO
            axios.post('http://localhost:3333/userscores', {
              wpm: 2000,
              acc: 100,
              date: new Date(),
              difficulty: "easy"
            }, {
              withCredentials: true
            })
            .then(result => {
              console.log(result);
            })
            .catch(err => console.log(err));
*/
const PORT = 3333;
const app = express();
app.use(express.json());
const corsOptions ={
  origin: 'http://localhost:3000', 
  credentials: true
}
app.use(cors(corsOptions));
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://groupuser:TaDIjdcjzQ6i4wwL@pingutypedb.pqjnivb.mongodb.net/profiles' }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Cookie max age (1 day)
    httpOnly: true,
    secure: false
  },
}));

mongoose.connect('mongodb+srv://groupuser:TaDIjdcjzQ6i4wwL@pingutypedb.pqjnivb.mongodb.net/profiles');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Account.findOne({ username: username });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Set user in the session
        req.session.username = user.username;
        req.session.save();
        console.log('Session data:', req.session.username);
        res.json("Successfully logged in.");
      } else {
        res.json("The username or password is incorrect.");
      }
    } else {
      res.json("The username or password is incorrect.");
    }
  } catch (err) {
    console.error(err);
    res.json({ error: 'Something went wrong during login.' });
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.json({ message: 'Unauthorized' });
    console.log(req.session.username);
  }
};

app.post('/userscores', isAuthenticated, (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
