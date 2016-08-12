var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var models  = require('../models');

/* GET users listing. */
router.get('/new', function(req, res) {
  res.render('sessions/new', {
    title:      'Log In'
  });
});

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/pads',
    failureRedirect : '/sessions/new'
  }));

router.get('/logout', function(req, res){
   req.logout();
   req.session.destroy();
   res.redirect('/');
  });

module.exports = router;
