$(function() {
  $(".change-devoured").on("click", function(event) {
    var id = $(this).data("id");
    var newDevoured = $(this).data("newDevoured");

    var datas = {
      id: id
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: datas
    }).then(
      function() {
        console.log("changed devoured for", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-burger").on("submit", function(event) {


    var newBurger = {
      burger_name: $("#burger").val().trim()
    };

    console.log(newBurger)

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");

      }
    );
  });

});