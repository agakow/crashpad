/* jshint esversion: 6 */
var Browser = require('zombie');

Browser.localhost('example.com', 3000);

describe('User visits list pad page', function() {

  browser = new Browser();
  var url = 'http://localhost:3000';

  before(function(done) {
    browser.visit(url + '/pads/new', done);
  });

  describe('list pad', function() {

    before(function(done) {
      browser
        .fill('name',           'Tims House')
        .fill('description',    'This is a description')
        .fill('location',       'Angel')
        .fill('price',          200)
        .fill('availableFrom',  "2016-08-16")
        .fill('availableTo',    "2016-08-30")
        .pressButton('List my pad', done);
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('will redirect to /pads', function() {
      browser.assert.url(url + '/pads');
    });

  });

});
