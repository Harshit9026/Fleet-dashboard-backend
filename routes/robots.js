const express = require('express');
const router = express.Router();

// Simulated robot data
const fakeRobotData = require('../data/fake_robot_data.json');

router.get('/', (req, res) => {
    res.json(fakeRobotData);
});

module.exports = router;
