var stegRead = function () {
	var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	return {
		init : function () {
			gBrowser.addEventListener("load", function () {
				var autoRun = prefManager.getBoolPref("extensions.steg-read.autorun");
				if (autoRun) {
					stegRead.run();
				}
			}, false);
		},

		run : function () {
			var head = content.document.getElementsByTagName("head")[0],
				style = content.document.getElementById("steg-read-style"),
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
				// console.log(.getAttribute("name"))
				elm.className += ((elm.className.length > 0)? " " : "") + "steg-read-selected";
			}
			if (foundImages === 0) {
				alert("No images found");
			}
			else {
				alert("Found " + foundImages + " images with <img> tags");
			}
		}
	};
}();
window.addEventListener("load", steg-read.init, false);