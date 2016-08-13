var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/', isLoggedIn, function(req, res, next) {
  res.render('requests/index', {
    title: 'Requests',
    message: req.flash('loginMessage')
  });
});

router.post('/', function(req, res, next) {
    var booking = models.booking.create({
                  bookingDate:  req.body.bookingDate,
                  padId:        req.body.padId,
                  userId:       req.session.passport.user
    }).then(function(user) {
    res.redirect('/requests');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/sessions/new');
  }

module.exports = router;
