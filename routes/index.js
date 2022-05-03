var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users')
const passport = require('passport');

/* GET home page. */
router.get('/', usersCtrl.index);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
), function(req, res) {
  console.log('hello')
  res.redirect('/~' + req.user.username);
});

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
