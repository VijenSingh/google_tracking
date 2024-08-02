
const Tracking = require('../models/Tracking');

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
