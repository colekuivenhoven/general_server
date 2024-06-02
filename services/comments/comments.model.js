const mongoose = require('mongoose');

// Schema
const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    movie_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);