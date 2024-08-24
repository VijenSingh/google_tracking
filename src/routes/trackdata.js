const express = require('express');
const router = express.Router();
const { trackDataiFrame,trackDataErrorScript,trackDataEvent } = require('../controllers/trackController');


// POST /trackdata - Save tracking data
router.post('/', trackDataiFrame);

// GET /trackdata/err.js - Error tracking script
router.get('/err.js', trackDataErrorScript);

// GET /trackdata_event - Handle event tracking
router.get('/trackdata_event', trackDataEvent);

module.exports = router;
