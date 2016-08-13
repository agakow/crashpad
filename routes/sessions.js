var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var models  = require('../models');

router.get('/new', function(req, res, next) {
  res.render('sessions/new', {
    title:      'Log In',
    error_msg: req.flash('loginMessage')
  });
});

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/pads',
    failureRedirect : '/sessions/new',
    failureFlash : true
  }));

router.get('/logout', function(req, res, next){
   req.logout();
   res.redirect('/');
  });

module.exports = router;
