const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/corsMiddleware');
const trackRoutes = require('./routes/track');
const path = require('path');
require('./config/db'); 

const app = express();

app.use(corsMiddleware);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/track', trackRoutes);

module.exports = app;
