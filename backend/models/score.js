const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model("Score", new Schema({
    wpm: {type: Number, required: true},
    acc: {type: Number, required: true},
    date: {type: String, required: true},
    difficulty: {type: String, required: true},
    time: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: "Account", required: true},
    score: {type: Number}
}));