const express = require('express');
const trackController = require('../controllers/trackController');
const router = express.Router();

router.post('/', trackController.trackData);
router.get('/', trackController.getTrackedData);

module.exports = router;
