const express = require('express');
const router = express.Router();
const { loginUser,registerUser,getTrackedAllData,handleScriptPost } = require('../controllers/trackController');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/alltrackdata', getTrackedAllData);
router.post('/script', handleScriptPost);

module.exports = router;
