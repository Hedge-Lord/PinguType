const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Account = require('./models/account.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3333;

mongoose.connect('mongodb+srv://groupuser:TaDIjdcjzQ6i4wwL@pingutypedb.pqjnivb.mongodb.net/profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://groupuser:TaDIjdcjzQ6i4wwL@pingutypedb.pqjnivb.mongodb.net/profiles' }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // Cookie max age (1 day)
    httpOnly: true,
    secure: true
  },
}));

const isAuthenticated = (req, res, next) => {
  if (req.session.username) {
      // User is authenticated
      next();
  } else {
      // User is not authenticated
      res.json({ message: 'Unauthorized' });
  }
};


app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Account.findOne({ username: username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Set user in the session
        req.session.username = user.username;
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


app.post('/userscores', isAuthenticated, (req, res) => {
  const { wpm, acc, difficulty } = req.body;
  const username = req.session.username; // Get the username from the session
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
        difficulty,
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
