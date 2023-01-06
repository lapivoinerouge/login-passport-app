const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, profile);
  // console.log(profile);
}));

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});