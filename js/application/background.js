(function() {
    "use strict";
    
    function StartApplication() {
        chrome.app.window.create(
            "html/application/main.html",
            {
                "id": "codeforces-solved-status-viewer-main"
            }
        );
    }

    chrome.app.runtime.onLaunched.addListener(StartApplication);
    chrome.app.runtime.onRestarted.addListener(StartApplication);

}).call(window);
