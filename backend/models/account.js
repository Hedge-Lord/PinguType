const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    scores: [{
        wpm: Number,
        acc: Number,
        date: Date,
        difficulty: String,
    }]
});

const Account = mongoose.model("accounts", accountSchema);
module.exports = Account;