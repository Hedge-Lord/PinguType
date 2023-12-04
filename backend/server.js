const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const Account = require('./models/account.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./strategies/passport');
const logger = require('morgan');

const apiRouter = require('./routes/api.js');

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
const PORT = process.env.PORT || 3333;
mongoose.connect(process.env.mongoDB_URL);

const app = express();
app.use(logger('dev'));
app.use(express.json());
const corsOptions ={
  origin: 'http://localhost:3000', 
  credentials: true
}

app.use(cors(corsOptions));
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

app.use('/', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
