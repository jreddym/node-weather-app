const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handle bar engine and Views Location
app.set('view engine', 'hbs');
app.set('views', viewsPath); // This line tells express to check for templates folder insteed of default views folder
hbs.registerPartials(partialsPath);

// Setting up Static Directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jagadeeswara Reddy',
    home_active: 'active',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jagadeeswara Reddy',
    about_active: 'active',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is Jagadeeswara Reddy ',
    name: 'Jagadeeswara Reddy',
    help_active: 'active',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide Address',
    });
  }

  geoCode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: foreCastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term',
    });
  }

  console.log(req.query);
  res.send({
    product: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    message: 'Help Article Not Found',
    name: 'Jagadeeswara Reddy',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    message: 'Page not found',
    name: 'Jagadeeswara Reddy',
  });
});

app.listen(port, () => {
  console.log(`Server started in PORT : ${port}`);
});
