const express = require('express');
const router = express.Router();
const { addTrain, searchTrains } = require('../controllers/trainController');
const verifyToken = require('../middleware/authMiddleware');

// @route   POST /api/trains
// @desc    Add a train to the system
// @access  Private (Requires JWT token)
router.post('/', verifyToken, addTrain);

// @route   GET /api/trains/search
// @desc    Search for trains between stations
// @access  Public
router.get('/search', searchTrains);

module.exports = router;
