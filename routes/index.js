var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/fans');
});

//Google OAuth login
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email']}
  ));

//Google OAuth callback
router.get('/oauth2callback', passport.authenticate(
  'google',
  {  //change these redirects later
    successRedirect: '/fans',
    failureRedirect: '/fans',
  }
));

//Google OAuth logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/fans'); //change this redirect later
});


module.exports = router;
