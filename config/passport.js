var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Fan = require('../models/fan');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
},
function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth!
    Fan.findOne({ 'googleId': profile.id }, function(err, fan) {
      if (err) return cb(err);
      if (fan) {
        if (!fan.avatar) {
          fan.avatar = profile.photos[0].value;
          fan.save(function(err) {
            return cb(null, fan);
          });
        } else {
          return cb(null, fan);
        }
      } else {
        // we have a new student via OAuth!
        var newFan = new Fan({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newFan.save(function(err) {
          if (err) return cb(err);
          return cb(null, newFan);
        });
      }
    });
  }
));
passport.serializeUser(function(fan, done){
    done(null, fan.id);
});

passport.deserializeUser(function(id, done){
    Fan.findById(id, function(err, fan){
        done(err, fan);
    });
});