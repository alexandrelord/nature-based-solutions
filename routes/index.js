var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users')

const passport = require('passport');

/* GET home page. */
router.get('/', userCtrl.index);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] } // add more scope?
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    // make sure to refactor 
    successRedirect : '/',
    failureRedirect : '/'
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
