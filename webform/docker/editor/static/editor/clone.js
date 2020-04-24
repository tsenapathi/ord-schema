console.log("loading...")

var schema = {};

// Hook up the Submit button
$('#submit').on('click', function () {
    console.log("button clicked");
});

// Hook up the Restore to Default button
document.getElementById('restore').addEventListener('click', function () {
    // editor.setValue(starting_value);
});

$('.json-editor-btn-add').on('click', function () {
    console.log("add button clicked");
});

// TODO validator