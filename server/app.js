const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
  res.send('Welcome to Pandora\'s Box API');
});

app.all('*', (req, res) => {
  res.status(404).send('Page not found');
});

module.exports = app;
