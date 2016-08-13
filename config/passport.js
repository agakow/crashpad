var LocalStrategy = require('passport-local').Strategy;
var models  = require('../models');
var bcrypt = require('bcrypt');

module.exports = function(passport) {
//passport session setup

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
        },
    function(req, email, password, done) {
        models.user.findOne({
          where: { 'email' : email }
      }).then(function(user, err){
        if(err){
          return done(err);
        }
        if(!user){
          return done(null, false, req.flash('loginMessage', 'Email is not registered. Please sign up.'));
        }
        if(!bcrypt.compareSync(password, user.passwordDigest)){
          return done(null, false, req.flash('loginMessage', 'The password is incorrect.'));
        }
        return done(null, user);
      });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        models.user.findOne({where: {id: id}}).then(function(user){
            done(null, user);
        });
    });

module.exports = passport;
};
