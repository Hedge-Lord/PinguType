const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3333;

mongoose.connect('mongodb+srv://groupuser:h1gDdHju63YUjbqo@pingutypedb.pqjnivb.mongodb.net/profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const accountSchema = new mongoose.Schema({
    user: String,
    password: String
})
const accountModel = mongoose.model("accounts", accountSchema);
app.post('/register', (req, res) => {
    accountModel.create(req.body)
    .then(accounts => res.json(accounts))
    .catch(err => res.json(err));
})
app.post('/login', (req, res) => {
    const {user, password} = req.body;
    accountModel.findOne({user: user}).then(
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
