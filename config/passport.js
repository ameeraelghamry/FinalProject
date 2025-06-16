// the continue with google 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
  done(null, user); // saves the whole user object into the session
});

passport.deserializeUser((user, done) => {
  done(null, user); // retrieves the user from session
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    //  can save the profile to the database here
    return done(null, profile);
  }
));
