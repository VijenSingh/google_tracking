const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

console.log('Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS); 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 30000,socketTimeoutMS: 45000 })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose;
