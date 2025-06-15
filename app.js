const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session'); // enables session support 
const path = require('path');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv/config')

const api = process.env.API_URL
const carsRoutes = require('./routers/cars')
const userRoutes = require('./routers/users') // makes the routes be recognized by express 
const adminRoutes = require('./routers/admins');
const sendEmail = require('../Utils/sendEmail'); //for herokuku fixing error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

app.set('view engine', 'ejs'); //can render html files like the ejs with dynamic data 
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); //makes the frontend files be accessible in the browser 
app.use(cookieParser());
app.use(cors());

i18n.configure({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang',
  cookie: 'locale',
  autoReload: true,
  syncFiles: true
});
app.use(i18n.init);

app.use(bodyParser.json()); 
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({  //stores user data across requests 
  secret: 'your_secret_key',    // used to sign the session id cookie 
  resave: false,               // wont save the session without it  
  saveUninitialized: true,      // wont  create the session until smth is stored 
  cookie: { secure: false }
}));

// Make locale available in all views
app.use((req, res, next) => {
  res.locals.locale = req.getLocale();
  res.locals.__ = res.__ = req.__; // pass __ function to views for convenience
  next();
});

// Then mount routes
app.use(`${api}/cars`, carsRoutes);
app.use(`${api}/users`, userRoutes);  
app.use(`${api}/admin`, adminRoutes);

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('Database connection is ready...'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  res.render('home', { user: req.session?.user });
});

app.get('/contact', (req, res) => {
  res.render('ContactUs', { user: req.session?.user });
});

app.get('/about', (req, res) => {
  res.render('AboutUs', { user: req.session?.user });
});

app.get('/policy', (req, res) => {
  res.render('OurPolicy', { user: req.session?.user });
});

app.get('/signup', (req, res) => {
  res.render('signup', { 
    user: req.session?.user,
    email: req.query.email || ''
  });
});

app.get('/admin', (req, res) => {
  res.render('admin/requests', { user: req.session?.user });
});

// app.get('/admin/requests/details', (req, res) => {
//   res.render('admin/requests/requests/details', { user: req.session?.user });
// });

app.get('/explore', (req, res) => {
  res.render('Explore', { user: req.session?.user });
});


app.get('/login', (req, res) => {
  res.render('login', { user: req.session?.user }); // renders the login.ejs 

});

app.get('/forgotpassword', (req, res) => {
  res.render('forgotpassword', { user: req.session.user });
});

app.get('/verify', (req, res) => {
  res.render('verify', { user: req.session.user });
});

app.get('/resetpass', (req, res) => {
  res.render('resetpass', { user: req.session.user });
});


// Language switcher
app.get('/lang/:locale', (req, res) => {
  const locale = req.params.locale;
  res.cookie('locale', locale, { maxAge: 900000, httpOnly: false });
  const backURL = req.header('Referer') || '/';
  res.redirect(backURL);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
