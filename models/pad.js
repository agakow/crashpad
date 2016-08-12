var Sequelize = require('sequelize');
"use strict";

module.exports = function(sequelize, DataTypes) {

  var Pad = sequelize.define("pad", {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    price: {
      type: Sequelize.DECIMAL
    },
    availableFrom: {
      type: Sequelize.DATE
    },
    availableTo: {
      type: Sequelize.DATE
    }
  }, {
    classMethods: {
      associate: function(models) {
        Pad.belongsTo(models.user);
      }
    }
  });

  return Pad;
};
