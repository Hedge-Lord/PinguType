const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Account = require('./models/account.js');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3333;

mongoose.connect('mongodb+srv://groupuser:TaDIjdcjzQ6i4wwL@pingutypedb.pqjnivb.mongodb.net/profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/register', (req, res) => {
    Account.create(req.body)
    .then(accounts => res.json(accounts))
    .catch(err => res.json(err));
})
app.post('/login', (req, res) => {
    const {user, password} = req.body;
    Account.findOne({user: user}).then(
        user=>{
            if (user)
            {
                if(user.password === password)
                {
                    res.json("Successfully logged in.");
                }
                else
                {
                    res.json("The username or password is incorrect.");
                }
            }
            else
            {
                res.json("The username or password is incorrect.");
            }
        }
    )
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
