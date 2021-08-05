const path = require('path');
const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send("Welcome to Pandora's Box API");
});

app.all('*', (req, res) => {
  res.status(404).render('404');
});

module.exports = app;
