const mongoose = require('mongoose');

// Schema
const insightSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    data: {
        type: Object,
        required: true,
    },
    data_type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Insight', insightSchema);