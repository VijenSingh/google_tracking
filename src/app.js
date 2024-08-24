

const express = require('express');
const corsMiddleware = require('./middleware/corsMiddleware');
const trackRoutes = require('./routes/track'); 
const trackDataRoutes = require('./routes/trackdata'); 
const authRoutes = require('./routes/auth');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(corsMiddleware);

// Routes
app.use('/track', trackRoutes); 
app.use('/trackdata', trackDataRoutes); 
app.use('/api', authRoutes);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;

