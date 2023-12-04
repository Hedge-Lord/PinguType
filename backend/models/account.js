const mongoose = require('mongoose');

const Schema = mongoose.Schema;

module.exports = mongoose.model("Account", new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 1
    },
    best_score: {
        type: Schema.Types.ObjectId,
        ref: "Score"
    }
}));