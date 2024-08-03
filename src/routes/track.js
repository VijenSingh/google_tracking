const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
require('dotenv').config();

// Admin authentication middleware
const isAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === process.env.JWT_SECRET) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};
router.post('/register', trackController.registerUser);
router.post('/login', trackController.loginUser);
router.post('/', trackController.trackData);
router.get('/', trackController.getTrackedData);

module.exports = router;
