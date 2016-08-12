var Sequelize = require('sequelize');

"use strict";

module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define("booking", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    bookingDate: {
      type: Sequelize.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Booking.belongsTo(models.pad);
        Booking.belongsTo(models.user);
      }
    }
  });

  return Booking;
};
