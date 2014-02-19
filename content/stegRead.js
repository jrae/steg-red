let console = (Cu.import("resource://gre/modules/devtools/Console.jsm", {})).console;

var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

/**
 * StegRead namespace.
 */
if ("undefined" == typeof(StegRead)) {
  var StegRead = {};
};

StegRead.current_image_src = null;

StegRead.BrowserOverlay = {

		init : function () {
			console.log("init steg-read");
			var autoRun = prefManager.getBoolPref("extensions.steg-read.autorun");
			console.log(prefManager.getBoolPref("extensions.steg-read.autorun"));
			gBrowser.addEventListener("load", function (event) {
				var autoRun = prefManager.getBoolPref("extensions.steg-read.autorun");
				if (autoRun) {
					// console.log("running after load")
					StegRead.BrowserOverlay.run(event);
				}
			}, false);
		},

		run : function (event) {

			var head = content.document.getElementsByTagName("head")[0],
				style = content.document.getElementById("steg-read-style"),
				// need to consider background-url images
				allImages = content.document.getElementsByTagName("img"),
				foundImages = allImages.length;

			if (!style) {
				style = content.document.createElement("link");
				style.id = "steg-read-style";
				style.type = "text/css";
				style.rel = "stylesheet";
				style.href = "chrome://steg-read/skin/skin.css";
				head.appendChild(style);
			}

			for (var i=0, il=foundImages; i<il; i++) {
				elm = allImages[i];
				// console.log(elm.getAttribute("id"));
				elm.className += ((elm.className.length > 0)? " " : "") + "steg-read-selected";
				elm.addEventListener("contextmenu", function(aEvent) {
						StegRead.current_image_src = aEvent.target.getAttribute("src");
				 }, false);
			}
			if (foundImages === 0) {
				alert("No images found");
			}

			// if (window.XMLHttpRequest) { // Mozilla, Safari, ...
   //  		httpRequest = new XMLHttpRequest();
			// } else if (window.ActiveXObject) { // IE 8 and older
			//   httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			// }

			// httpRequest.onreadystatechange = function(response){
				// console.log(response);
			// };

			// $.ajax({
	  //     url: questionSignificantPath(question),
	  //     type: 'put',
	  //     data: data,
	  //     dataType: 'json',
	  //     success: function() {
   //      $(question).addClass('significant').
   //        siblings('.value').removeClass('significant');
   //    	}
   //  	});

			// else {
			// 	alert("Found " + foundImages + " images with <img> tags");
			// }
		},

		find : function (event) {
			var params = {inn: {url: StegRead.current_image_src}, out: null};
			console.log("image src: ", StegRead.current_image_src);
			var doc = window.openDialog(
			  "chrome://steg-read/content/story.xul",
			  "steg-read-story",
			  "chrome, dialog, modal, resizable=yes",
			  params);
		}
};
window.addEventListener("load", StegRead.BrowserOverlay.init(), false);