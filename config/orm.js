
// Dependencies
var connection = require("./connection.js");

// ORM

var tableName = "burgers";

var orm = {

  all: function(callback) {

    // In the other two query strings you concatenate the above tableName
    // variable instead of hard coding the value. Either way is fine, 
    // but I'd suggest sticking with one or the other for the sake
    // of consistency.
    var q = "SELECT * FROM burgers ";

    connection.query(q, function(err, result) {
      // You should have some error handling in place here, even if it's rudimentary
      callback(result);
    });

  },

  addBurger: function(burger, callback) {

    var q = "INSERT INTO " + tableName + " (burger_name) VALUES (?)";

    connection.query(q, [burger.burger_name], function(err, result) {
      // You should have some error handling in place here, even if it's rudimentary
      callback(result);
    });

  },
  eatAndUpdateBurger: function(id, cb) {
    var queryString = "UPDATE " + tableName;

    queryString += " SET devoured = 1";
    queryString += " WHERE id = ?";
    // Concatenating values directly into a sql query is generally recognized as bad practice.
    // It's better to let the mysql client handle this sort of thing especially since concatenation
    // can pose a very serious security risk --> https://stackoverflow.com/questions/28473476/avoid-string-concatenation-to-create-queries
    // queryString += id;

    console.log(queryString);
    connection.query(queryString, [ id ], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

};

module.exports = orm;
