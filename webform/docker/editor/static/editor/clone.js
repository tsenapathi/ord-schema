/**
 * Copyright 2020 The Open Reaction Database Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// var proto_url = "https://raw.githubusercontent.com/Open-Reaction-Database/ord-schema/master/proto/reaction.proto"
var proto_url = "/static/editor/reaction.proto"


// Load the protobuf, and hook up buttons
var reaction;
var schema_parent;
var schema;
protobuf.load(proto_url).then(function (root) {
    schema_parent = root;
    schema = root.nested["ord"];

    message = schema.Reaction;
    reaction = message.create(); // create instance of reaction
    console.log(schema);

    $('#submit').click(submit_button_function);
    $('.json-editor-btn-add').click(identifier_add_button_function);
    $('#valid_indicator')[0].style.backgroundColor = "gray";
});
// All the form's protobuf functionality doesn't load until the protobuf loads;
// so no "loading..." indicator is necessary, I think

var errors;
// Submit the reaction to the backend
function submit_button_function() {
    console.log("submit button clicked");

    // get inputted data, using elements in html form
    var identifiers = $("#identifiers-list").children('');
    console.log(identifiers);

    var err = message.verify(reaction);
    if (err) throw Error(err);

    var encode = message.encode(reaction).finish()
    console.log(encode);

    // We encode the payload as a string, to use Python's ParseFromString in backend
    // and to allow sending through Ajax/jQuery
    var encodeString = String.fromCharCode.apply(null, encode)
    console.log(encodeString)
    $.post('/editor/send_protobuf', encodeString, function (data) {
        errors = JSON.parse(data);
        console.log(errors);

        var indicator = document.getElementById('valid_indicator');
        
        // Not valid
        if(errors.length) {
          indicator.style.backgroundColor = 'red';
          indicator.textContent = "validation failed";
        }
        // Valid
        else {
          indicator.style.backgroundColor = 'green';
          indicator.textContent = "validation passed";
        }
        // TODO handle this message: empty, non-empty, 500 error

        // TODO print this message on frontend
        // TODO can't match an error emssage to where it specificcally comes from in proto; how to do this?
        // Send the reaction part-by-part?
    })
    .fail(function() {
        alert( "error" );
      });

}

// Helper function that we might end up needing
function getRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Add reaction identifier to the form. Note that we don't need to keep
// track of where we are in the hierarchy for this input, because we
// will only have reaction identifiers defined at the highest level.
function identifier_add_button_function() {
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
        // identifier.removeAttribute("bytes_value"); // value and bytes_value mutually exclusive
        // TODO make the above commented-out line work; removeAttribute doesn't seem to be a valid method
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

        index = reaction.identifiers.indexOf(identifier);
        if (index > -1) {
            reaction.identifiers.splice(index, 1);
        }
    });
    p.appendChild(remove_button);

    // TODO: make this event listener include the add button
    // or better yet, create an event listener for the entire identifiers-list element
    p.addEventListener("change", function () {
        console.log("change");
        submit_button_function();
    });

    // Add the div element to the site!
    $("#identifiers-list").append(p);
};

// TODO a live validation system, e.g. a rectangle that turns red when the inputted data is invalid