const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const productRoutes = require('./routes/products');

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/v1', (req, res) => {
  res.send("Welcome to Pandora's Box API");
});

app.use('/api/v1/products', productRoutes);

app.all('*', (req, res) => {
  res.status(404).render('404');
});

module.exports = app;
