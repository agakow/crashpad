var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res, next) {
  var allPads = models.pad.findAll().then(function(allPads) {
    res.render('pads/index', {
    title:      'Pad Listings',
    padList:    allPads
    });
  });
});

router.get('/new', function(req, res, next) {
  res.render('pads/new', {
    title:      'List New Pad'
  });
});

router.post('/', function(req, res, next) {
  var pad = models.pad.create({name:     req.body.name,
                  location:       req.body.location,
                  description:    req.body.description,
                  price:          req.body.price,
                  availableFrom:  req.body.availableFrom,
                  availableTo:    req.body.availableTo,
                  userId:         req.session.passport.user
  }).then(function(user) {
  res.redirect('/pads');
  });
});

router.get('/:id', function(req, res, next) {
  var user_id = req.params.id;
  var allPads = models.pad.findAll({
    where: {
      id: user_id
    }
  }).then(function(allPads) {
    res.render('pads/pad', {
    title:      'Pad Booking',
    padList:    allPads
    });
  });
});

module.exports = router;
