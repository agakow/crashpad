var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var models  = require('../models');

router.get('/new', function(req, res, next) {
  res.render('sessions/new', {
    title: 'Sign In',
    error_msg: req.flash('signInError')
  });
});

router.post('/', passport.authenticate('local-signIn', {
    successRedirect : '/pads',
    failureRedirect : '/sessions/new',
    failureFlash : true
  }));

router.get('/signout', function(req, res, next){
   req.logout();
   res.redirect('/');
  });

module.exports = router;
