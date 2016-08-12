var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/', function(req, res, next) {
  var user_id = req.session.passport.user;
  var userRequestedBookings = models.booking.findAll({
    where: {
      userId: user_id
    }
  }).then(function(userRequestedBookings) {
    var userRequestedPads = models.pad.findAll({
      where: {
        id: userRequestedBookings[0].padId
      }
  }).then(function(userRequestedPads) {
    res.render('requests/index', {
    title:      'Requests',
    reqBookings:    userRequestedBookings,
    reqPads:        userRequestedPads
      });
    });
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

module.exports = router;
