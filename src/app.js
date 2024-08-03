const express = require('express');
const corsMiddleware = require('./middleware/corsMiddleware');
const trackRoutes = require('./routes/track');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());
app.use(corsMiddleware);

app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/track', trackRoutes);

module.exports = app;


