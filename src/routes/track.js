const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
require('dotenv').config();

router.post('/', trackController.trackData);
router.get('/', trackController.getTrackedData);


module.exports = router;
