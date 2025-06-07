const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session');
const path = require('path');
require('dotenv/config')


//routers
const api = process.env.API_URL
const carsRoutes = require('./routers/cars')
const userRoutes = require('./routers/users')
const rentalRoutes = require('./routers/rentals')
const adminRoutes = require('./routers/admins');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

//middleware
app.use(bodyParser.json())
app.use(morgan('tiny')) //good to display log requests

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


//main routes of products
app.use(`${api}/cars`, carsRoutes)
app.use(`${api}/users`, userRoutes)
app.use(`${api}/rentals`, rentalRoutes)
app.use(`${api}/admin`, adminRoutes);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database connection is ready...')
  })
  .catch((err) => {
    console.log(err)
  })


app.get('/', (req, res) => {
  res.render('home', { user: req.session?.user });
});

app.get('/contact', (req, res) => {
  res.render('ContactUs', { user: req.session.user });
});

app.get('/about', (req, res) => {
  res.render('AboutUs', { user: req.session?.user });
});

app.get('/policy', (req, res) => {
  res.render('OurPolicy', { user: req.session?.user });
});

app.get('/signup', (req, res) => {
  res.render('SignUp', { user: req.session?.user });
});

app.get('/admin', (req, res) => {
  res.render('admin/requests', { user: req.session?.user });
});

//listening port for server
app.listen(3000, () => {
  console.log('server is running on port 3000')
})

//example for testing