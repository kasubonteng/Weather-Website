const path = require("path");
const express = require("express");
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();

// . DEFINE PATHS FOR EXPRESS CONFIG 
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// . SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// . SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
        res.render('index', {
            title: 'Weather',
            name: 'Kwadwo Asubonteng'
        })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kwadwo Asubonteng'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        exampleMessage: 'This is an example message',
        title: 'Help',
        name: 'Kwadwo Asubonteng'
    })
})


app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must enter an address'
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({forecastError})
      }
      return res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) =>{
  res.render('404', {
    title: 'Help Page',
    name: 'Kwadwo Asubonteng',
    errorMessage: '404 error'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 error',
    name: 'Kwadwo Asubonteng',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
