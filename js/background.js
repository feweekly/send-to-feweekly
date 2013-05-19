/* globals util, feweekly */
$(function () {
    var VERSION = feweekly.version;
    var SHOW_RELEASE_NOTES = feweekly.showReleaseNotes;

    // Helpers
    Array.prototype.removeByValue = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === val) {
                this.splice(i, 1);
                break;
            }
        }
    };

    // Notifications
    function showInvalidURLNotification(tab) {
        util.sendMessageToTab(tab, {status: "error", error: "Sorry, you can only save valid web pages to Feweekly."});
    }

    function loadNotificationUIIntoPage(tab, url) {
        if (url) {
            util.executeScriptInTab(tab, "window.___FEWKLY__URL_TO_SAVE = '" + url + "'");
        }
        util.executeScriptFromURLInTab(tab, "js/notify.js");
    }

    function showSavedToolbarIcon(tabId) {
        if (util.isChrome()) {
            chrome.browserAction.setIcon({
                tabId: tabId,
                path: {
                    "19": "../img/browser-action-icon-added-19.png",
                    "38": "../img/browser-action-icon-added-38.png"
                }
            });
        }
    }

    function broadcastMessageToAllTabs(msg) {
        util.getAllTabs(function (tabs) {
            $.each(tabs, function (index, tab) {
                util.sendMessageToTab(tab, msg);
            });
        });
    }

    // Context menu
    (function setupChromeContextMenu() {
        function handler(info, tab) {
            var url   = info.linkUrl,
                title = info.selectionText || url;

            feweekly.log('contextMenu', JSON.stringify(info));

            if (!url) {
                url = tab.url;
                title = tab.title;
            }

            if (!util.isValidURL(url)) {
                showInvalidURLNotification(tab);
                return;
            }

            loadNotificationUIIntoPage(tab, url);

            feweekly.add(title, url, {
                success: function () {
                    util.sendMessageToTab(tab, {status: "success"});
                    util.executeScriptInTab(tab, "window.___FEWKLY__URL_SAVED = '" + url + "'");
                },
                error: function (status, xhr) {
                    // We have to delay the error message injection to let the
                    // overlay have time to initialize
                    setTimeout(function () {
                        // Check for online status
                        if (!navigator.onLine) {
                            util.sendMessageToTab(tab, {status: "error", error: "Oops! You must be online to save this page."});
                            return;
                        }

                        util.sendMessageToTab(tab, {status: "error", error: xhr.getResponseHeader("X-Error")});
                    }, 100);
                }
            });
        }

        // Add a context menu entry for links to add them to the queue
        chrome.contextMenus.create({
            "title": "Send to Feweekly",
            "contexts": ["page", "frame", "editable", "image", "video", "audio", "link", "selection"],
            "onclick": handler
        });

    }());

    // Listener for messages
    util.addMessageListener(function messageListenerCallback(request, sender, sendResponse) {
        var tabId, url, title;

        if (request.action === "getSetting") {
            sendResponse({"value": util.getSetting(request.key)});
            return false;

        } else if (request.action === "setSetting") {
            util.setSetting(request.key, request.value);

            broadcastMessageToAllTabs({
                action: "settingChanged",
                key: request.key,
                value: request.value
            });

            sendResponse({});
            return false;

        } else if (request.action === "openTab") {
            util.openTabWithURL(request.url);
            sendResponse({});
            return false;

        } else if (request.action === "addURL") {
            tabId = (sender && sender.tab && sender.tab.id ? sender.tab.id : null);

            url   = request.url;
            title = request.title;

            if (!util.isValidURL(url)) {
                showInvalidURLNotification(sender.tab);
                return false;
            }

            loadNotificationUIIntoPage(sender.tab, url);

            feweekly.add(title, url, {
                referer: request.referer,
                success: function () {
                    if (request.showSavedToolbarIcon && request.showSavedToolbarIcon === true) {
                        showSavedToolbarIcon(tabId);
                    }

                    util.executeScriptInTab(sender.tab, "window.___FEWKLY__URL_SAVED = '" + url + "'");
                    util.sendMessageToTab(sender.tab, {status: "success"});
                    sendResponse({status: "success"});
                },
                error: function (status, xhr) {
                    // Inject the error message into the overlay
                    setTimeout(function () {
                        // Check for online status
                        if (!navigator.onLine) {
                            util.sendMessageToTab(sender.tab, {status: "error", error: "Oops! You must be online to save this page."});
                            return;
                        }

                        util.sendMessageToTab(sender.tab, {status: "error", error: xhr.getResponseHeader("X-Error")});
                    }, 100);

                    sendResponse({status: "error"});
                }
            });

            return true;
        }
    });


    // Handles clicks on the page action, browser action in Chrome and Safaris toolbar item
    function handleSaveToFeweekly(tab, inUrl) {
        var title = tab.title,
            url   = inUrl || tab.url;

        feweekly.log("handleSaveToFeweekly", url);

        if (!util.isValidURL(url)) {
            showInvalidURLNotification(tab);
            return;
        }

        loadNotificationUIIntoPage(tab, url);

        feweekly.add(title, url, {
            success: function () {
                showSavedToolbarIcon(tab.id);
                util.sendMessageToTab(tab, {"status": "success"});
                util.executeScriptInTab(tab, "window.___FEWKLY__URL_SAVED = '" + url + "'");
            },
            error: function (status, xhr) {
                // We have to delay the error message injection to let the
                // overlay have time to initialize
                setTimeout(function () {
                    // Check for online status
                    if (!navigator.onLine) {
                        util.sendMessageToTab(tab, {status: "error", error: "Oops! You must be online to save this page."});
                        return;
                    }

                    util.sendMessageToTab(tab, {status: "error", error: xhr.getResponseHeader("X-Error")});
                }, 100);
            }
        });
    }

    chrome.browserAction.onClicked.addListener(handleSaveToFeweekly);

    // Initialization code
    (function initialize() {

        // Default settings
        $.each({
            "keyboard-shortcut": "true",
            "keyboard-shortcut-add": (util.isMac() ? String.fromCharCode("8984") + "+" + String.fromCharCode("8679") + "+P" : "ctrl+shift+S")
        }, function (key, value) {
            if (!util.getSetting(key)) {
                util.setSetting(key, value);
            }
        });

        // Change command key in the keyboard shortcut on windows or linux to ctrl
        if (!util.isMac() && util.getSetting("keyboard-shortcut-add").match("command")) {
            util.setSetting("keyboard-shortcut-add", util.getSetting("keyboard-shortcut-add").replace(/command/g, "ctrl"));
        }

        // Check for first time installation
        // TODO first install url
        if (util.getSetting("installed") !== "true") {
            util.setSetting("installed", "true");
            util.openTabWithURL("http://www.feweekly.com/installed/");
        } else if (SHOW_RELEASE_NOTES && util.getSetting("installed") === "true" && (!util.getSetting("lastInstalledVersion") || util.getSetting("lastInstalledVersion") !== VERSION)) {
            // Check for upgrade from 1.0
            // Show upgrade message
            var browser = util.isChrome() ? "chrome" : "safari";
            util.openTabWithURL("http://www.feweekly.com/" + browser + "/updated?v=" + VERSION + "&vo=" + util.getSetting("lastInstalledVersion"));
        }

        util.setSetting("lastInstalledVersion", VERSION);

    }());
});
