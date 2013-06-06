var util = {

    // Utility functions
    isValidURL: function (s) {
        return (/^https?\:/i).test(s);
    },

    isChrome: function () {
        return window['chrome'] !== undefined && window.chrome.app;
    },

    isSafari: function () {
        return window['safari'] !== undefined;
    },

    isMac: function () {
        return navigator.platform.match(/^Mac/) !== null;
    },

    // Abstract browser specific funtionality

    getCurrentTab: function (cb) {
        if (util.isChrome()) {
            chrome.tabs.getSelected(null, function (tab) {
                cb(tab);
            });
        } else if (util.isSafari()) {
            var tab = safari.application.activeBrowserWindow.activeTab;
            cb(tab);
        }
    },

    getAllTabs: function (cb) {
        if (util.isChrome()) {
            chrome.tabs.query({}, cb);
        } else if (util.isSafari()) {
            var windows = safari.application.browserWindows;
            var tabs = [];
            for (var windowIdx = 0; windowIdx < windows.length; windowIdx++) {
                var windowTabs = windows[windowIdx].tabs;
                for (var tabIdx = 0; tabIdx < windowTabs.length; tabIdx++) {
                    tabs.push(windowTabs[tabIdx]);
                }
            }

            cb(tabs);
        } else {
            cb([]);
        }
    },

    executeScriptInTab: function (tab, script) {
        if (util.isChrome()) {
            chrome.tabs.executeScript(tab.id, {code: script});
        } else if (util.isSafari()) {
            tab.page.dispatchMessage('executeScript', script);
        }
    },

    executeScriptFromURLInTab: function (tab, scriptURL) {
        if (util.isChrome()) {
            chrome.tabs.executeScript(tab.id, {file: scriptURL});
        } else if (util.isSafari()) {
            var script = $.ajax({
                type: 'GET',
                url: '../' + scriptURL,
                async: false
            });
            util.executeScriptInTab(tab, script.responseText);
        }
    },

    // TODO 实现safari中的多脚本注入
    executeMultiScriptFromURLInTab: function (tab, scripts, afterInject) {
        var scriptURL = scripts.shift();
        if (!scriptURL) {
            if (afterInject) {
                afterInject();
            }
            return;
        }

        if (util.isChrome()) {
            chrome.tabs.executeScript(tab.id, {file: scriptURL}, function () {
                util.executeMultiScriptFromURLInTab(tab, scripts, afterInject);
            });
        } else if (util.isSafari()) {
        }
    },

    executeScriptFromURLInTabWithCallback: function (tab, scriptURL, cb) {
        if (util.isChrome()) {
            chrome.tabs.executeScript(tab.id, {file: scriptURL}, cb);
        } else if (util.isSafari()) {

            // TODO: This is not working at the moment, because executeScriptInTab
            //       is an async operation, we need to fix that!
            var script = $.ajax({
                type: 'GET',
                url: '../' + scriptURL,
                async: false
            });

            util.executeScriptInTab(tab, script.responseText);
            cb();
        }
    },

    injectScript: function (func) {
        var actualCode = '(' + func + ')();';

        var script = document.createElement('script');
        script.textContent = actualCode;
        (document.head || document.documentElement).appendChild(script);
        script.parentNode.removeChild(script);
    },

    openTabWithURL: function (url) {
        if (util.isChrome()) {
            chrome.tabs.create({
                url: url
            });
        } else if (util.isSafari()) {
            var tab = safari.application.activeBrowserWindow.openTab();
            tab.url = url;
        }
    },


    // Settings

    // Helper methods because localStorage can't save bools -.-
    stringFromBool: function (bl) {
        if (bl === false) {
            return 'false';
        } else {
            return 'true';
        }
    },

    boolFromString: function (str) {
        if (typeof str === 'string') {
            if (str === 'false') {
                return false;
            } else {
                return true;
            }
        } else {
            // If the expected str is already a bool just return the bool
            // E.g. Safari settings returns bool
            return str;
        }
    },

    getSetting: function (key) {
        return util.settingContainerForKey(key)[key];
    },

    setSetting: function (key, value) {
        var location = util.settingContainerForKey(key);
        if (!value && location === localStorage) {
            localStorage.removeItem(key);
        } else {
            location[key] = value;
        }
    },

    settingContainerForKey: function (key) {
        if (util.isSafari()) {
            var location;
            if (key === 'username' || key === 'password') {
                location = safari.extension.secureSettings;
            } else {
                location = localStorage;
            }
            return location;
        } else {
            return localStorage;
        }
    },


    // Message Handling

    addMessageListener: function (handler) {
        if (util.isChrome()) {
            if (window.chrome.runtime.onMessage) {
                chrome.runtime.onMessage.addListener(handler);
            } else if (window.chrome.extension.onMessage) {
                chrome.extension.onMessage.addListener(handler);
            } else {
                chrome.extension.onRequest.addListener(handler);
            }
        } else if (util.isSafari()) {
            var listenable;

            if (safari.self && safari.self.addEventListener) {
                // Listenable is from an injected script
                listenable = safari.self;
            } else if (safari.application && safari.application.addEventListener) {
                // Listenable is from the a global html
                listenable = safari.application;
            }

            if (listenable) {
                listenable.addEventListener('message', function (message) {
                    message.tab = message.target;
                    var cb;

                    if (message.message.__cbId) {
                        var tab = message.tab;
                        var cbId = message.message.__cbId;
                        cb = function (data) {
                            if (tab && tab.page && tab.page.dispatchMessage) {
                                tab.page.dispatchMessage('__performCb', {
                                    cbId: cbId,
                                    data: data
                                });
                            }
                        };
                        message.__cbId = undefined;
                    }

                    handler(message.message, message, cb);
                }, false);
            }
        }
    },

    // Message from the global page to a specific tab
    sendMessageToTab: function (tab, message) {
        if (util.isChrome()) {
            chrome.tabs.sendMessage(tab.id, message);
        } else if (util.isSafari()) {
            tab.page.dispatchMessage('message', message);
        }
    },

    // Message from an injected script to the background
    sendMessage: function (message, cb) {
        if (util.isChrome()) {
            if (!cb) cb = function () {};
            if (chrome.runtime.sendMessage) {
                chrome.runtime.sendMessage(message, cb);
            } else if (chrome.extension.sendMessage) {
                chrome.extension.sendMessage(message, cb);
            } else {
                chrome.extension.sendRequest(message, cb);
            }
        } else if (util.isSafari()) {
            // if (cb) {
            //     // message['__cbId'] = Callbacker.addCb(cb);
            // }

            safari.self.tab.dispatchMessage('message', message);
        }
    }
};
