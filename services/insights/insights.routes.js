const express = require('express');
const router = express.Router();
const insightsController = require('./insights.controller');

// Get insight
router.get('/getInsight', insightsController.getInsight);

module.exports = router;