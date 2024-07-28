const app = require('./app');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 1314;

app.listen(port, () => {
  console.log(`Tracking server running at http://localhost:${port}`);
});
