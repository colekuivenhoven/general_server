const mongoose = require('mongoose');

// Schema
const thingSchema = new mongoose.Schema({
    content: {
        type: Object,
        required: true,
    },
});

module.exports = mongoose.model('Thing', thingSchema);