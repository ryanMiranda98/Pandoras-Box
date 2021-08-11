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
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.error(err); // eslint-disable-line
      console.log('Could not connect to DB'); // eslint-disable-line
    } else {
      console.log('Connected to DB'); // eslint-disable-line

      const server = http.createServer(app);

      const PORT = process.env.PORT || 5000;
      server.listen(PORT, () => {
        console.log( // eslint-disable-line
          `Pandora is running on port ${PORT} using ${process.env.NODE_ENV} server`,
        );
      });
    }
  },
);
