console.log("loading...")

var schema = {};

// Hook up the Submit button
$('#submit').on('click', function () {
    console.log("submit button clicked");
});

$('.json-editor-btn-add').on('click', function () {
    console.log("add button clicked");
    $("#identifiers-list").append($('<div>').load("identifier"));
});

// $("#identifiers-list").append($('<div>').load("identifier"));

// TODO make this all occur _AFTER_ page load

// TODO validator