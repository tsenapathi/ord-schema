console.log("loading...")

var schema = {};
var identifierCount = 0;

// Hook up the Submit button
$('#submit').on('click', function () {
    console.log("submit button clicked");
});

$('.json-editor-btn-add').on('click', function () {
    console.log("add button clicked");

    // create the element
    var newDiv = $('<div>').load("identifier", function() {
        // Hook the element to actually do things
        // Needs to be a callback, in order to properly load
        newDiv.find('.json-editor-btn-delete').on('click', function () {
            console.log("delete button clicked");
        });
    });

    // add it to the site!
    $("#identifiers-list").append(newDiv);

});

// TODO make this all occur _AFTER_ page load

// TODO validator