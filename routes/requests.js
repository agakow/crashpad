var express = require('express');
var router = express.Router();
var models  = require('../models');


router.get('/', function(req, res, next) {
  res.render('requests/index', {
    title: 'Requests'
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
