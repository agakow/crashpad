var Sequelize = require('sequelize');
var sequelize = new Sequelize('crashpad_development', null, null, {
        dialect: "postgres",
        port: 5432,
        sync: { force: false }
    });

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

  module.exports = sequelize;
