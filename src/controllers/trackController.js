require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Tracking = require('../models/Tracking');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });         
  }
};


exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);
      if (isMatch) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ error: 'Failed to log in user' });
  }
};



exports.trackData = async (req, res) => {
  console.log('Tracking Data Received:', req.body);

  const trackingData = new Tracking(req.body);
  try {
    const savedData = await trackingData.save();
    res.json(savedData);        
  } catch (err) {
    console.error('Error saving tracking data:', err);
    res.status(500).json({ error: 'Failed to save tracking data' });
  }
};

exports.getTrackedData = async (req, res) => {
  try {
    const trackedData = await Tracking.find().exec();
    res.json(trackedData);
  } catch (err) {
    console.error('Error retrieving tracking data:', err);
    res.status(500).json({ error: 'Error retrieving tracking data' });
  }
};
