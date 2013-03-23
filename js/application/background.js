(function() {
    "use strict";

    chrome.app.runtime.onLaunched.addListener(function() {
        window.open('html/application/main.html');
    });

}).call(window);
