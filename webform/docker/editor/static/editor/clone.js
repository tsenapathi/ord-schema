// var proto_url = "https://raw.githubusercontent.com/Open-Reaction-Database/ord-schema/master/proto/reaction.proto"
var proto_url = "https://raw.githubusercontent.com/Open-Reaction-Database/ord-schema/webform/webform/docker/editor/static/editor/small.proto"

// Load the protobuf
var reaction;
var schema_parent;
var ReactionMessage;
var ReactionUnrepeatedMessage;
var ReactionIdentifierMessage;
protobuf.load(proto_url).then(function (root) {
	schema_parent = root;

    // ReactionMessage = root.lookupType("ord.Reaction");
    ReactionUnrepeatedMessage = root.lookupType("ord.ReactionUnrepeated");
    ReactionIdentifierMessage = root.lookupType("ord.ReactionIdentifier");
    reaction = ReactionUnrepeatedMessage.create(); // create instance of reaction
    console.log(ReactionUnrepeatedMessage)
});

var encodeString;

// TODO how to return a success message? Busy-wait using cookies?

// Hook up the Submit button
$('#submit').on('click', function () {
    console.log("submit button clicked");

    // get inputted data, using elements in html form
    var identifiers = $("#identifiers-list").children('');
    console.log(identifiers);
    // TODO actually get from elements

    // Loop over fields
    fieldnames = Object.keys(reaction.$type.fields);
    for (i = 0, len = fieldnames.length; i < len; i++) {
        var fieldname = fieldnames[i];
        console.log(fieldname);
        console.log(reaction.$type.fields[fieldname])
    }

    payload = {identifiers: {type: ReactionIdentifierMessage.IdentifierType.RINCHI}}
    var encode = ReactionUnrepeatedMessage.encode(payload).finish()
    console.log(encode)
    // TODO (1) figure out how repeated fields work

    // TODO don't forget to verify!!
    ReactionUnrepeatedMessage.verify(reaction);

    // We encode the payload as a string, to use Python's ParseFromString in backend
    // and to allow sending through Ajax/jQuery
    var encodeString = String.fromCharCode.apply(null, encode)
    console.log(encodeString)
    $.post('/editor/send_protobuf', encodeString, function( data ) {
        console.log(data);
      });

});

// Hook up the add button for Reaction Identifier
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