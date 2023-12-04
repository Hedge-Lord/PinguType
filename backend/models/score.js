const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model("Score", new Schema({
    wpm: {type: Number, required: true},
    acc: {type: Number, required: true},
    date: {type: Date, required: true, default: new Date()},
    difficulty: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "Account", required: true}
}));