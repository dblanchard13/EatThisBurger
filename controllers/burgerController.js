var express = require("express");

var router = express.Router();
var orm = require("../config/orm.js");

router.get("/", function(req, res) {
  orm.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

  // If a user sends data to add a new burger...
router.post("/api/burgers", function(req, res) {

	// Take the request...
	var burger = req.body;

	// Then send it to the ORM to "save" into the DB.
	orm.addBurger(burger, function(data) {
	  console.log("data passed was " + data);
    // Doesn't make a functional difference in this case because the form submit on the client
    // causes the page to refresh, but you generally still want to complete the request 
    // even if it's just to signal to other people reading the code that: "this is where the controller action ends"
    res.redirect('/')
	});

});

router.put("/api/burgers/:id", function(req, res) {

  // console.log("id", id);

  orm.eatAndUpdateBurger(req.params.id, function(result) {
    // It's a good practice to use strict equality checking with triple equals
    // instead of the type coercion checking you're using here.
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router
