var LocalStrategy = require('passport-local').Strategy;
var models  = require('../models');



module.exports = function(passport) {
//passport session setup
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    models.user.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
        },
    function(req, email, password, done) {
        models.user.findOne({
          where: { 'email' : email
        }
      }).then(function(user, err){
        if(err){
          return done(err);
        }
        if(!user){
          return done(null, false);
        }
        if(!bcrypt.compareSync(password, user.get('passwordDigest'))){
          return done(null, false);
        }
        console.log(req.session);
        return done(null, user);
      });
    }));

    passport.serializeUser(function(user, done){
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
      models.user.findById(id).then(function(user){
        done(null, user);
      });
    });


    //
    // function(err, user) {
    //     if (err) {return done(err); }
    //     if (!user) {
    //         return done(null, false);
    //     }
    //     if (!user.validPassword(password)) {
    //         return done(null, false);
    //     }
    //     return done(null, user);
//
// passport.use('local-signup', new LocalStrategy({
//     usernameField : 'email',
//     passwordField : 'password',
//     passReqTodone : true
//         },
//     function(req, email, password, done) {
//         process.nextTick(function() {
//         User.findOne({ 'email':  email }, function(err, user) {
//             if (err)
//                 return done(err);
//             if (user) {
//                 return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
//             } else {
//                 var newUser = new User();
//                 newUser.email    = email;
//                 newUser.password = password;  //newUser.generateHash(password);
//                 newUser.save(function(err) {
//                 if (err)
//                     throw err;
//                 return done(null, newUser);
//                 });
//              }
//         });
//
//     });
//
//  }));
module.exports = passport;
};
