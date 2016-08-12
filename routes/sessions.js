var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
/* GET users listing. */
router.get('/new', function(req, res) {
  res.render('sessions/new', {
    title:      'Log In',
    errors: req.flash('loginMessage')
  });
});

router.post('/', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/sessions/new',
    failureFlash: true
  }));

router.get('/logout', function(req, res){
   req.logout();
   req.session.destroy();
   res.redirect('/');
  });

module.exports = router;
