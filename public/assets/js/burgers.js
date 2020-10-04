$(function(){
    $(".devouredOrNot").on("click", function(event){
        const id = $(this).data("id");
        // put request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: {devoured: true}
        }).then(function(){
            console.log("Burger has been devoured");
            location.reload();
        });
    });

    $(".form").on("submit", function(event){
        event.preventDefault();
        const newBurg = {
            name: $("#burger").val().trim(),
            devoured: false
        };

        // post request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurg
        }).then(function() {
            console.log("Burger has been queued");
            location.reload();
        });
    });
})