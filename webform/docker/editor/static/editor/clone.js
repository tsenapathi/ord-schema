console.log("loading...")

var schema = {};
var identifierCount = 0;

var root_global = 0;
var ReactionMessage;
// Load the protobuf
protobuf.load(proto_url).then(function (root) {
    console.log(root)
    root_global = root
    ReactionMessage = root.lookupType("ord.Reaction")
    console.log("protobuf load")
});
// TODO how to return a success message? Busy-wait using cookies?

// Hook up the Submit button
$('#submit').on('click', function () {
    // get all elements 
    var identifiers = $("#identifiers-list").children('');

    // roll into a protobuf

    console.log("submit button clicked");
    console.log(identifiers);
});

// Hook up the add buttons
$('.json-editor-btn-add').on('click', function () {
    console.log("add button clicked");

    // create the element
    var newDiv = $('<div>').load("identifier", function () {
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