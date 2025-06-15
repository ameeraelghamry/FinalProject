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

const bookingRoutes = require('./routers/bookingroute');
const { Booking } = require('./models/booking'); // Import the Booking model

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
app.use('/api/booking', bookingRoutes);

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

app.get('/admin', async (req, res) => {
  try {
    console.log('Admin route accessed');
    // Get all checkout requests from the database
    const checkoutRequests = await Booking.find().sort({ dateCreated: -1 });
    console.log('Found checkout requests:', checkoutRequests.length);
    
    res.render('Admin/requests', { 
      user: req.session?.user,
      requests: checkoutRequests
    });
  } catch (error) {
    console.error('Error fetching checkout requests:', error);
    res.status(500).json({ 
      error: 'Error loading admin page'
    });
  }
});

app.get('/explore', (req, res) => {
  res.render('Explore', { user: req.session?.user });
});


app.get('/login', (req, res) => {
  res.render('login', { user: req.session?.user }); // renders the login.ejs 

});

app.use((req, res, next) => { //for debugging
  console.log(`${req.method}  ${req.originalUrl}`);
  next();
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

// Simple routing for checkout, success, and car details pages
app.get('/checkout', (req, res) => {
  res.render('checkout', { user: req.session?.user });
});

app.get('/success', async (req, res) => {
  try {
    const bookingRef = req.query.ref;
    let booking = null;
    
    if (bookingRef) {
      booking = await Booking.findOne({ bookingReference: bookingRef });
    }
    
    // Always render success page with whatever data we have
    res.render('success', { 
      user: req.session?.user,
      booking: booking || req.session?.lastBooking || null
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.render('success', { 
      user: req.session?.user,
      booking: req.session?.lastBooking || null
    });
  }
});

// Add GET route for pending page
app.get('/pending', async (req, res) => {
  try {
    const bookingRef = req.query.ref;
    let booking = null;
    
    if (bookingRef) {
      booking = await Booking.findOne({ bookingReference: bookingRef });
    }

    // Even if no booking is found, still render the pending page
    res.render('pending', {
      user: req.session?.user,
      booking: booking || req.session?.lastBooking || null
    });
  } catch (error) {
    console.error('Error loading pending page:', error);
    res.render('pending', {
      user: req.session?.user,
      booking: req.session?.lastBooking || null
    });
  }
});

// Add POST route for pending page
app.post('/pending', async (req, res) => {
  try {
    console.log('=== CHECKOUT FORM SUBMITTED TO PENDING ===');
    console.log('Received checkout data:', req.body);
    
    // Create new booking with form data
    const booking = new Booking({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      identityImage: req.body.identityImage || null,
      country: req.body.country || '',
      city: req.body.city || '',
      address: req.body.address || '',
      paymentMethod: req.body.paymentMethod || 'card',
      status: 'pending',
      bookingReference: `NW-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`
    });

    // Save booking to database
    const savedBooking = await booking.save();
    console.log('Checkout saved successfully:', savedBooking.bookingReference);

    // Store booking data in session
    req.session.lastBooking = savedBooking;

    res.render('pending', {
      user: req.session?.user,
      booking: savedBooking
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    // Still render pending page but with session data
    res.render('pending', {
      user: req.session?.user,
      booking: req.session?.lastBooking || null,
      error: 'There was an error processing your checkout. Please try again.'
    });
  }
});

app.get('/cars/:id', (req, res) => {
  res.render('cardetails', { 
    user: req.session?.user,
    car: { _id: req.params.id } // Simple placeholder, actual car data would come from database
  });
});


// Language switcher
app.get('/lang/:locale', (req, res) => {
  const locale = req.params.locale;
  res.cookie('locale', locale, { maxAge: 900000, httpOnly: false });
  const backURL = req.header('Referer') || '/';
  res.redirect(backURL);
});

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date() });
});

// Test POST route
app.post('/test-post', (req, res) => {
  console.log('Test POST received:', req.body);
  res.json({ message: 'POST working!', body: req.body });
});

// Add booking status API endpoint
app.get('/api/booking/status/:bookingRef', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingReference: req.params.bookingRef });
    
    if (!booking) {
      return res.json({ status: 'not_found' });
    }
    
    res.json({ status: booking.status });
  } catch (error) {
    console.error('Error checking booking status:', error);
    res.json({ status: 'error' });
  }
});

// Process payment route
app.post('/process-payment', async (req, res) => {
  try {
    const { bookingRef } = req.body;
    const booking = await Booking.findOne({ bookingReference: bookingRef });
    
    if (!booking) {
      return res.json({ status: 'error', message: 'Booking not found' });
    }

    // Update booking status to processing
    booking.status = 'processing';
    await booking.save();

    res.json({ status: 'success', redirectUrl: `/pending?ref=${bookingRef}` });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.json({ status: 'error', message: 'Error processing payment' });
  }
});

// Admin route to update booking status
app.post('/admin/booking/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }
    
    // Update booking status
    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      { status: status }, 
      { new: true }
    );
    
    if (!updatedBooking) {
      return res.status(404).json({ 
        success: false, 
        message: 'Booking not found' 
      });
    }
    
    console.log(`Booking ${id} status updated to ${status}`);
    
    // Send email based on status
    if (status === 'confirmed') {
      await sendConfirmationEmail(updatedBooking);
    } else if (status === 'cancelled' || status === 'declined') {
      await sendDeclinedEmail(updatedBooking);
    }
    
    // If booking is confirmed, provide success page URL for customer
    let customerUrl = null;
    if (status === 'confirmed') {
      customerUrl = `/success?ref=${updatedBooking.bookingReference}`;
    } else if (status === 'cancelled' || status === 'declined') {
      customerUrl = `/declined?ref=${updatedBooking.bookingReference}`;
    }
    
    res.json({ 
      success: true, 
      message: `Booking ${status} successfully`,
      booking: updatedBooking,
      customerUrl: customerUrl
    });
    
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating booking status' 
    });
  }
});

// Route to display success page with booking reference
app.get('/success/:bookingRef', async (req, res) => {
  try {
    const { bookingRef } = req.params;
    const booking = await Booking.findOne({ bookingReference: bookingRef });
    
    if (!booking) {
      return res.status(400).json({ 
        error: 'Booking not found'
      });
    }
    
    // Only show success page if booking is confirmed
    if (booking.status !== 'confirmed') {
      return res.redirect('/pending');
    }
    
    res.render('success', { 
      user: req.session?.user,
      booking: booking
    });
    
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      error: 'Error loading booking details'
    });
  }
});

// Add declined page route
app.get('/declined', async (req, res) => {
  try {
    // Get booking reference from query parameter
    const bookingRef = req.query.ref;
    let booking = null;
    
    if (bookingRef) {
      // Fetch booking from database
      booking = await Booking.findOne({ bookingReference: bookingRef });
    }
    
    res.render('declined', { 
      user: req.session?.user,
      booking: booking || req.session?.lastBooking || null
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.render('declined', { 
      user: req.session?.user,
      booking: req.session?.lastBooking || null
    });
  }
});

// Cookie consent API endpoints
app.post('/api/cookie-consent', async (req, res) => {
  try {
    const { sessionId, consentData } = req.body;
    res.json({ status: 'success', sessionId, consentData });
  } catch (error) {
    console.error('Error saving cookie consent:', error);
    res.json({ status: 'error', message: 'Failed to save consent' });
  }
});

app.get('/api/cookie-consent/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    res.json({ status: 'success', sessionId, consentData: null });
  } catch (error) {
    console.error('Error retrieving cookie consent:', error);
    res.json({ status: 'error', message: 'Failed to retrieve consent' });
  }
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
