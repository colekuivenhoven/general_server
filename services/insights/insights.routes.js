const express = require('express');
const router = express.Router();
const insightsController = require('./insights.controller');

// Get insight
router.post('/getInsight', insightsController.getInsight);

module.exports = router;