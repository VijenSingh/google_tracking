const Tracking = require('../models/Tracking');

exports.trackData = async (req, res) => {
  console.log('Tracking Data Received:', req.body);

  // Save the tracking data to MongoDB
  const trackingData = new Tracking(req.body);
  try {
    const savedData = await trackingData.save();
    res.json({
      id: savedData._id,
      utm_source: savedData.utm_source,
      utm_medium: savedData.utm_medium,
      utm_campaign: savedData.utm_campaign
    });
  } catch (err) {
    console.error('Error saving tracking data:', err);
    res.status(500).json({ error: 'Failed to save tracking data' });
  }
};

exports.getTrackedData = async (req, res) => {
  try {
    const trackedData = await Tracking.find().exec();
    res.send(`
      <html>
        <head>
          <title>Tracked Data</title>
        </head>
        <body>
          <h1>Tracked Data</h1>
          <p>Go to <a href="/">Home</a> </p>
          <table border="1">
            <tr>
              <th>URL</th>
              <th>Referrer</th>
              <th>UTM Source</th>
              <th>UTM Medium</th>
              <th>UTM Campaign</th>
              <th>Device Type</th>
              <th>User Agent</th>
              <th>Timestamp</th>
            </tr>
            ${trackedData.map(data => `
              <tr>
                <td>${data.url}</td>
                <td>${data.referrer}</td>
                <td>${data.utm_source}</td>
                <td>${data.utm_medium}</td>
                <td>${data.utm_campaign}</td>
                <td>${data.device_type}</td>
                <td>${data.user_agent}</td>
                <td>${new Date(data.timestamp).toLocaleString()}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('Error retrieving tracking data:', err);
    res.status(500).send('Error retrieving tracking data');
  }
};
