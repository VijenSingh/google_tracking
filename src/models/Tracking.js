const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  url: String,
  referrer: String,
  utm_source: String,
  utm_medium: String,
  utm_campaign: String,
  device_type: String,
  user_agent: String,
  uxid: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tracking', trackingSchema);
