var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res, next) {
  var allPads = models.pad.findAll().then(function(allPads) {
    res.render('pads/index', {
    title:      'Pad Listings',
    padList:    allPads,
    });
  });
});

router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('pads/new', {
    title: 'List New Pad'
  });
});

router.post('/', function(req, res, next) {
  var pad = models.pad.create({
                  name:           req.body.name,
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
  var allPads = models.pad.findAll({
    where: { id: req.params.id }
  }).then(function(allPads) {
    res.render('pads/pad', {
    title:      'Pad Booking',
    padList:    allPads
    });
  });
});

router.get('/mypads/:id', isLoggedIn, function(req, res) {
  var userPads = models.pad.findAll({
    where: { userId: req.params.id }
    }).then(function(userPads){
    res.render('pads/mypads', {
    title:    'My Pad Listings',
    padList:   userPads,
    });
  });
});

// router.get('/:availableFrom/:availableTo', function(req, res, next) {
//   models.pad.findAll({ where: {availableFrom: req.param.availableFrom, }})
// });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/sessions/new');
  }

module.exports = router;
