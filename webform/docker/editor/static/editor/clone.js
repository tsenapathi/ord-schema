// var proto_url = "https://raw.githubusercontent.com/Open-Reaction-Database/ord-schema/master/proto/reaction.proto"
var proto_url = "https://raw.githubusercontent.com/Open-Reaction-Database/ord-schema/webform/webform/docker/editor/static/editor/small.proto"

// Load the protobuf, and hook up buttons
var reaction;
var schema_parent;
var schema;
var ReactionMessage;
var ReactionUnrepeatedMessage;
var ReactionIdentifierMessage;
protobuf.load(proto_url).then(function (root) {
    schema_parent = root;
    schema = root.nested["ord"]

    ReactionMessage = schema.Reaction;
    ReactionUnrepeatedMessage = schema.ReactionUnrepeated;
    ReactionIdentifierMessage = schema.ReactionIdentifier;

    message = ReactionMessage; // set message here!! keep above lines intact
    reaction = message.create(); // create instance of reaction
    console.log(schema);

    $('#submit').click(submit_button_function);
    $('.json-editor-btn-add').click(identifier_add_button_function);
});
// TODO how to return a success message? Busy-wait using cookies?

// Submit the reaction to the backend
// TODO make this use the inputted data (right now, creates some fake sample data)
function submit_button_function() {
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

    payload = { identifiers: [{ type: ReactionIdentifierMessage.IdentifierType.RINCHI }] }
    var encode = message.encode(payload).finish()
    console.log(encode)
    // TODO (1) figure out how repeated fields work

    // TODO don't forget to verify!!
    message.verify(reaction);

    // We encode the payload as a string, to use Python's ParseFromString in backend
    // and to allow sending through Ajax/jQuery
    var encodeString = String.fromCharCode.apply(null, encode)
    console.log(encodeString)
    $.post('/editor/send_protobuf', encodeString, function (data) {
        console.log(data);
    });

}


function getRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}


var p;

// Add reaction identifier to the form. Note that we don't need to keep
// track of where we are in the hierarchy for this input, because we
// will only have reaction identifiers defined at the highest level.
function identifier_add_button_function () {
    console.log("add button clicked");

    var identifier_type_name = reaction.$type.fields["identifiers"].type;
    var identifier_type = schema[identifier_type_name];
    var identifier = identifier_type.create(); // start empty, but could put payload into create()
    reaction.identifiers.push(identifier);

    // Create the HTML div element that will contain the identifier
    var p = document.createElement("div");
    p.class = "ReactionIdentifier";
    p.id = getRandomString();
    p.style = "margin-top:40px"; // TODO: replace this with classes and real CSS later
    p.appendChild(document.createTextNode("Reaction identifier: "));
    p.appendChild(document.createElement("BR"));

    // Create value text box
    p.appendChild(document.createTextNode("value "));
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "[enter identifier]");
    input.setAttribute("size", "40");
    input.setAttribute("maxlength", "1000");
    input.addEventListener("change", function () {
        identifier.value = this.value;
        identifier.removeAttribute("bytes_value"); // value and bytes_value mutually exclusive
    });
    p.appendChild(input);
    p.appendChild(document.createElement("BR"));

    // TODO: do we expose bytes_value? Probably not

    // Add the options for a reaction identifier programmatically
    p.appendChild(document.createTextNode("type "));
    var selector = document.createElement("select");
    selector.id = getRandomString(); // might need to use for callbacks later, not sure
    for (var option_key in identifier_type.IdentifierType) {
        if (identifier_type.IdentifierType.hasOwnProperty(option_key)) {
            var option = document.createElement("option");
            option.value = identifier_type.IdentifierType[option_key];
            option.appendChild(document.createTextNode(option_key));
            selector.appendChild(option);
        }
    }
    selector.addEventListener("change", function () {
        identifier.type = parseInt(this.value);
    });
    p.appendChild(selector);
    p.appendChild(document.createElement("BR"));

    // Create details text box
    p.appendChild(document.createTextNode("details "));
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "[enter details]");
    input.setAttribute("size", "40");
    input.setAttribute("maxlength", "1000");
    input.addEventListener("change", function () {
        identifier.details = this.value;
    });
    p.appendChild(input);
    p.appendChild(document.createElement("BR"));

    // Add ability to remove this identifier
    var remove_button = document.createElement("BUTTON");
    remove_button.innerHTML = "remove";
    remove_button.addEventListener("click", function () {
        this.parentNode.parentNode.removeChild(this.parentNode);
        // TODO: how to remove this from the reaction.identifiers array?
    });
    p.appendChild(remove_button);

    // TODO: create an event listener for the whole div so that onchange,
    // we can serialize "identifier" and send it back to Python for validation.

    // Add the div element to the site!
    $("#identifiers-list").append(p);
};

// TODO a live validation system, e.g. a rectangle that turns red when the inputted data is invalid