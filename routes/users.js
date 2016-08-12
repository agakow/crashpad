var express = require('express');
var router = express.Router();
var models  = require('../models');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/new', function(req, res) {
  res.render('users/new', {
    title: 'Sign Up'
  });

});

router.post('/', function(req, res) {
  //Validation
  req.checkBody('firstName', "First name is required").notEmpty();
  req.checkBody('lastName', "Last name is required").notEmpty();
  req.checkBody('firstName', "Name is required").notEmpty();
  req.checkBody('email', "Email is required").notEmpty();
  req.checkBody('email', "Please enter a valid email").isEmail();
  req.checkBody('password', "Password is required").notEmpty();
  req.checkBody('passwordConfirmation', "Passwords do not match").equals(req.body.password);

  var errors = req.validationErrors();

  models.user.findOne({where: { 'email' : req.body.email}}).then(function(user, err) {
      if(user) {
      req.flash('error_msg', 'Email is already registered');
      res.render('users/new', {title: 'Sign Up', errors: errors});
    } else if(errors) {
        res.render('users/new', {title: 'Sign Up', errors: errors});
      } else {
        var newUser = models.user.build({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          passwordDigest: req.body.password
        });

        createUser(newUser, function(err, user){
          if(err) throw err;
        });
        req.flash('success_msg', 'You are registered and can now log in');
        res.redirect('/sessions/new');
      }
    });
});

var createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.passwordDigest, salt, function(err, hash) {
      newUser.passwordDigest = hash;
      newUser.save(callback);
    });
  });
};

module.exports = router;
