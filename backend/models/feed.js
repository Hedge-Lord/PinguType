const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    activityType: {
        type: String,
        enum: ['new_score'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;