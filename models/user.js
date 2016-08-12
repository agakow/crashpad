var Sequelize = require('sequelize');
"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true},
    firstName: {
      type: Sequelize.STRING,
      validate: {notEmpty: { msg: 'First name is required' }}},
    lastName: {
      type: Sequelize.STRING,
      validate: {notEmpty: { msg: 'Last name is required' }}},
    email: {
      type: Sequelize.STRING,
      unique: { msg: 'Email already registered' },
      validate: {isEmail: { msg: 'Invalid email.' }, notEmpty: { msg: 'The email is required' }}},
    passwordDigest: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.pad);
      }
    }
  });

  return User;
};
