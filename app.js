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

app.set('view engine', 'ejs'); //can render html files like the ejs with dynamic data 
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); //makes the frontend files be accessible in the browser 
app.use(cookieParser());
app.use(cors());

// Serve static files from the correct directories (from server.js)
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

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

// Database setup
const { Booking } = require('./models/bookings');

// Connect to existing database
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('Database connection is ready...'))
  .catch(err => console.log(err));

// Connect to MongoDB with better error handling
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI || process.env.CONNECTION_STRING || 'mongodb://localhost:27017/car-rental', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        // Don't exit the process, allow the server to start without DB
        console.log('Server will start without database connection');
    }
}

// Start server with proper error handling
async function startServer() {
    try {
        // First try to connect to MongoDB
        await connectDB();

        // Then start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${PORT} is already in use. Please try a different port or close the application using this port.`);
            } else {
                console.error('Error starting server:', err.message);
            }
            process.exit(1);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    }
}

// Import booking functions
const { processPayment, getAllBookings, createBooking, getBookingByReference, updateBooking, cancelBooking } = require('./models/bookings');

// VIEW ROUTES - All page rendering routes
app.get('/', (req, res) => {
    res.render('home', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/contact', (req, res) => {
    res.render('ContactUs', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/about', (req, res) => {
    res.render('AboutUs', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/policy', (req, res) => {
    res.render('OurPolicy', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/explore', (req, res) => {
    res.render('Explore', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

// Authentication pages - these are handled by user routes now
app.get('/signup', (req, res) => {
    res.render('signup', { 
        user: req.session?.user,
        email: req.query.email || '',
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/login', (req, res) => {
    res.render('login', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/verify', (req, res) => {
    res.render('verify', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

app.get('/resetpass', (req, res) => {
    res.render('resetpass', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

// Booking pages
app.get('/checkout', (req, res) => {
    res.render('checkout', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

// Admin pages
app.get('/admin', (req, res) => {
    if (!req.session?.user || req.session.user.Type !== 'admin') {
        return res.redirect('/login');
    }
    res.render('admin/requests', { 
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

// PAYMENT & BOOKING ROUTES
app.post('/process-payment', processPayment);

// BOOKING API ROUTES
app.get('/api/bookings', getAllBookings);
app.post('/api/bookings', createBooking);
app.get('/api/bookings/:reference', getBookingByReference);
app.put('/api/bookings/:reference', updateBooking);
app.patch('/api/bookings/:reference/cancel', cancelBooking);

// Language switcher
app.get('/lang/:locale', (req, res) => {
    const locale = req.params.locale;
    res.cookie('locale', locale, { maxAge: 900000, httpOnly: false });
    const backURL = req.header('Referer') || '/';
    res.redirect(backURL);
});

// Handle 404 errors for HTML routes
app.use((req, res) => {
    res.status(404).render('404', {
        user: req.session?.user,
        locale: req.getLocale(),
        __: req.__
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    
    // Check if it's an API request (JSON response expected)
    if (req.accepts('json') && !req.accepts('html')) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
            error: err.message
        });
    } else {
        // Render 404 page for all HTML error requests
        res.status(500).render('404', {
            user: req.session?.user,
            locale: req.getLocale(),
            __: req.__
        });
    }
});

// Start the server
startServer();
