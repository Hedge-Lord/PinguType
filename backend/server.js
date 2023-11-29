const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Account = require('./models/account.js');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3333;

mongoose.connect('mongodb+srv://groupuser:TaDIjdcjzQ6i4wwL@pingutypedb.pqjnivb.mongodb.net/profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      // Compare hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
