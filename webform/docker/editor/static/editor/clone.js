console.log("loading...")

var schema = {};
var identifierCount = 0;

var ReactionMessage;
var ReactionIdentifierMessage;
// Load the protobuf
protobuf.load(proto_url).then(function (root) {
    console.log(root);
    ReactionMessage = root.lookupType("ord.Reaction");
    ReactionIdentifierMessage = root.lookupType("ord.ReactionIdentifier");
    console.log("protobuf load");
});
// TODO how to return a success message? Busy-wait using cookies?

// Hook up the Submit button
$('#submit').on('click', function () {
    console.log("submit button clicked");

    // get all elements 
    var identifiers = $("#identifiers-list").children('');
    console.log(identifiers);
    // TODO actually get from elements

    payload = {type: 77}
    var encode = ReactionIdentifierMessage.encode(payload).finish()
    console.log(encode)
    // TODO how do nested protobufs work?? Worst case, could send multiple messages (for each protobuf)?

    // TODO send to backend
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

// TODO validator