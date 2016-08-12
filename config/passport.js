var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');



module.exports = function(passport) {
//passport session setup
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
        },
    function(req, email, password, done) {
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err) {return done(err); }
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No user found. Please Sign up'));
            }
            if (!bcrypt.compareSync(password, User.passwordDigest)) {
                return done(null, false, req.flash('loginMessage', 'Wrong password.'));
            }
            return done(null, user);
        });
    }));


passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
        },
    function(req, firstName, lastName, email, password, passwordConfirmation, done) {
        process.nextTick(function() {
        User.findOne({ 'email':  email }, function(err, user) {
            if (err) {
                console.log(err)
                return done(err);
            }
            if (user) {
                console.log(user)
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } console.log(password);
            console.log(passwordConfirmation)
            if (password !== passwordConfirmation) {
                return done(null, false, req.flash('signupMessage', 'Passwords do not match.'));
            } else {
                var newUser = User.build({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  passwordDigest: bcrypt.hashSync(password, 10)
                });

                newUser.save(function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
                });
               }
            });
         });
    }));

module.exports = passport;
};
