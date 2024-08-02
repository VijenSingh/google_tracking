const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

router.post('/', trackController.trackData);
router.get('/', trackController.getTrackedData);

module.exports = router;
