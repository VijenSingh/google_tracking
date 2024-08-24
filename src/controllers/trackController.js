
// src/controllers/trackController.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ScanCommand, PutCommand, QueryCommand,GetCommand } = require('@aws-sdk/lib-dynamodb');
const dynamoDb = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Register User
exports.registerUser = async (req, res) => {
  const { username, password,isAdmin = false } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const params = {
      TableName: 'Users',
      Item: {
        username,
        password: hashedPassword,
        isAdmin
      }
    };
    await dynamoDb.send(new PutCommand(params));
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
};



exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const params = {
      TableName: 'Users',
      Key: { username }
    };
    const result = await dynamoDb.send(new GetCommand(params));
    const user = result.Item;
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // JWT generate karte waqt isAdmin bhi include karein
        const token = jwt.sign(
          { userId: user.username, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // Response mein token ke sath isAdmin bhi bhejein
        res.json({ token, isAdmin: user.isAdmin });
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



// Track Data
exports.trackData = async (req, res) => {

  const trackingData = {
    TableName: 'Tracking',
    Item: req.body
  };
  try {
    await dynamoDb.send(new PutCommand(trackingData));
    res.json({ message: 'Tracking data saved successfully' });
  } catch (err) {
    console.error('Error saving tracking data:', err);
    res.status(500).json({ error: 'Failed to save tracking data' });
  }
};

// Get Tracked Data
exports.getTrackedData = async (req, res) => {
  try {
    const params = {
      TableName: 'Tracking'
    };
    const result = await dynamoDb.send(new ScanCommand(params));
    const  datalenth = result.Items.length-1;
    res.json({"id":result.Items[datalenth].user_id,"uxid" : result.Items[datalenth].uxid});
  } catch (err) {
    console.error('Error retrieving tracking data:', err);
    res.status(500).json({ error: 'Error retrieving tracking data' });
  }
};

// Get Tracked All Data
exports.getTrackedAllData = async (req, res) => {
  try {
    const params = {
      TableName: 'Tracking'
    };
    const result = await dynamoDb.send(new ScanCommand(params));
    res.json(result.Items);
  } catch (err) {
    console.error('Error retrieving tracking All data:', err);
    res.status(500).json({ error: 'Error retrieving tracking All data' });
  }
};

// Track Data
// Track Data - POST /trackdata
exports.trackDataiFrame = async (req, res) => {
  const { url, referrer, unique_id } = req.body;
  const timestamp = Date.now();
  const id = uuidv4();

  const params = {
      TableName: 'TrackData',
      Item: {
          id,
          url,
          referrer,
          unique_id,
          timestamp,
          error: null,
          event: null,
          site_id: null
      }
  };

  try {
      await dynamoDb.send(new PutCommand(params));
      res.json({ success: true, id });
  } catch (error) {
      console.error('DynamoDB error:', error);
      res.status(500).json({ error: 'Failed to save data', id });
  }
};

// Track Data Error Script - GET /trackdata/err.js
exports.trackDataErrorScript = (req, res) => {
  const { id } = req.query;

  console.log('Error tracked with ID:', id);

  res.send(`console.error('Error tracked with ID: ${id}');`);
};

// Track Data Event - GET /trackdata_event
exports.trackDataEvent = (req, res) => {
  const { site_id, user_id, event } = req.query;

  console.log(`Event: ${event}, Site ID: ${site_id}, User ID: ${user_id}`);

  res.send('Event tracked');
};

const trackingUrls = {
  'parisrhone.com': 'https://parisrhone.com/?irclickid=SnHQUPw5GxyKU6tXQ3xOmykMUkCwLQzAZ2kLyw0&sharedid=&irpid=2615427&irgwc=1&utm_source=affiliate&utm_medium=IMPACT&iradid=1811170',
  'www.enamor.co.in': 'https://www.enamor.co.in/?utm_source=affiliate&utm_medium=clickonik&utm_campaign=trackier_66c4c531c362fd034305d37e&utm_id=ss',
  "www.kindlife.in": "https://www.kindlife.in/?utm_source=adf&utm_medium=kl&utm_campaign=trackier_431_594_&click_id=66c4c21095f9a503410a971b",
  "www.muftijeans.in": "https://www.muftijeans.in/?utm_source=Adsflourish&utm_medium=CPS&utm_campaign=June24_66c4c0e058a6850342f11037_594_",
  "www.snitch.co.in": "https://www.snitch.co.in/?utm_source=Adsflourish&utm_medium=affiliate&utm_campaign=66c4d5e03f390c0348279fff_594_",
  "icruze-digital.com": "https://icruze-digital.com/collections/hot-selling?utm_source=AdsF&utm_medium=cps&utm_campaign=AdsFrsh_HTSL40OF-july_66c4c17fbbb0e1034e28060e_594_",
  "vaaree.com": "vaaree",
};

// Handle POST requests to /script
exports.handleScriptPost = async (req, res) => {
  const { url, referrer, coo, origin } = req.body;

  // For demonstration, log the incoming data
  console.log('Received data:');
  console.log('URL:', url);
  console.log('Referrer:', referrer);
  console.log('Cookies:', coo);
  console.log('Origin:', origin);

  // Determine the tracking URL based on the origin
  const responseUrl = trackingUrls[origin] || 'https://default-tracking-url.com';

  // Prepare the data for storage in DynamoDB
  const trackingData = {
    TableName: 'TrackingWithA',
    Item: {
      id: uuidv4(),
      url,
      referrer,
      cookies: coo,
      origin,
      responseUrl,
      timestamp: Date.now()
    }
  };

  try {
    // Store the tracking data in DynamoDB
    await dynamoDb.send(new PutCommand(trackingData));

    // Send a JSON response with the determined URL
    res.json({ url: responseUrl });
  } catch (err) {
    console.error('Error saving tracking data:', err);
    res.status(500).json({ error: 'Failed to save tracking data' });
  }
};