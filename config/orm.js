
// Dependencies
var connection = require("./connection.js");

// ORM

var tableName = "burgers";

var orm = {

  all: function(callback) {

    var q = "SELECT * FROM burgers ";

    connection.query(q, function(err, result) {
      callback(result);
    });

  },

  addBurger: function(burger, callback) {

    var q = "INSERT INTO " + tableName + " (burger_name) VALUES (?)";

    connection.query(q, [burger.burger_name], function(err, result) {
      callback(result);
    });

  },
  eatAndUpdateBurger: function(id, cb) {
    var queryString = "UPDATE " + tableName;

    queryString += " SET devoured = 1";
    queryString += " WHERE id =";
    queryString += id;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

};

module.exports = orm;
