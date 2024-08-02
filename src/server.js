const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();
require('./config/db');

const port = process.env.PORT || 131488;

app.listen(port, () => {
  console.log(`Tracking server running at http://localhost:${port}`);
});

