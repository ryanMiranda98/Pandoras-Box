const dotenv = require('dotenv');
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config();

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
      console.log('Could not connect to DB');
    } else {
      console.log('Connected to DB');

      const server = http.createServer(app);

      const PORT = process.env.PORT || 5000;
      server.listen(PORT, () => {
        console.log(
          `Pandora is running on port ${PORT} using ${process.env.NODE_ENV} server`,
        );
      });
    }
  },
);
