// let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;

// Called once when the dialog displays
function onLoad() {
  // Use the arguments passed to us by the caller
  // alert(window.arguments[0].inn.url);
  document.getElementById("stegred-src-url").value = window.arguments[0].inn.url;
  // window.arguments[0].inn.url;
}

// Called once if and only if the user clicks OK
function doOK() {
  // document.getElementById("stegred-src-url").value = window.arguments[0].inn.url;
   // Return the changed arguments.
   // Notice if user clicks cancel, window.arguments[0].out remains null
   // because this function is never called
   // window.arguments[0].out = {name:document.getElementById("name").value,
   //      description:document.getElementById("description").value,
   //      enabled:document.getElementById("enabled").checked};
   return true;
}