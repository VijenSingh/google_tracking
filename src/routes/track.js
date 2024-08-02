const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');

// Admin authentication middleware
const isAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'admin-secret-token') {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};


router.post('/', trackController.trackData);
router.get('/', trackController.getTrackedData);

module.exports = router;


//src/routes/track.js

 