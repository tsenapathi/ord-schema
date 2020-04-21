console.log("loading...")

var schema = {};

JSONEditor.defaults.theme = 'spectre';
JSONEditor.defaults.iconlib = 'spectre';

// Initialize the editor
var editor = new JSONEditor(
    document.getElementById('editor_holder'),
    {
        schema: schema,
        disable_array_reorder: true,
        disable_properties: true,
        disable_edit_json: true,
    });

// Hook up the submit button to log to the console
document.getElementById('submit').addEventListener('click', function () {
    // Get the value from the editor
    console.log(editor.getValue());
});

// Hook up the Restore to Default button
document.getElementById('restore').addEventListener('click', function () {
    editor.setValue(starting_value);
});

// Hook up the validation indicator to update its
// status whenever the editor changes
editor.on('change', function () {
    // Get an array of errors from the validator
    var errors = editor.validate();

    var indicator = document.getElementById('valid_indicator');

    // Not valid
    if (errors.length) {
        indicator.className = 'label label-danger'
        indicator.textContent = "not valid";
    }
    // Valid
    else {
        indicator.className = 'label label-success'
        indicator.textContent = "valid";
    }
});
