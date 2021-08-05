const dotenv = require('dotenv');
const http = require('http');
const app = require('./app');

dotenv.config();

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(
    `Pandora is running on port ${PORT} using ${process.env.NODE_ENV} server`,
  );
});
