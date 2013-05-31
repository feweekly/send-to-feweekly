/* globals util, feweekly */
$(function () {
    var VERSION = feweekly.version;
    var SHOW_RELEASE_NOTES = feweekly.showReleaseNotes;
    var authentication;

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
        util.sendMessageToTab(tab, {status: 'error', error: 'Sorry, you can only save valid web pages to Feweekly.'});
    }

    function loadNotificationUIIntoPage(tab, url) {
        if (url) {
            util.executeScriptInTab(tab, 'window.___FEWKLY__URL_TO_SAVE = "' + url + '"');
        }
        util.executeScriptFromURLInTab(tab, 'js/notify.js');
    }

    function showSavedToolbarIcon(tabId) {
        if (util.isChrome()) {
            chrome.browserAction.setIcon({
                tabId: tabId,
                path: {
                    '19': '../img/browser-action-icon-added-19.png',
                    '38': '../img/browser-action-icon-added-38.png'
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

            if (!feweekly.isSubscribed()) {
                authentication.showSubscribeWindow(tab, function () {
                    handler(info, tab);
                });
                return;
            }

            if (!util.isValidURL(url)) {
                showInvalidURLNotification(tab);
                return;
            }

            loadNotificationUIIntoPage(tab, url);

            feweekly.add(title, url, {
                success: function () {
                    util.sendMessageToTab(tab, {status: 'success'});
                    util.executeScriptInTab(tab, 'window.___FEWKLY__URL_SAVED = "' + url + '"');
                },
                error: function (status, xhr) {
                    // We have to delay the error message injection to let the
                    // overlay have time to initialize
                    setTimeout(function () {
                        // Check for online status
                        if (!navigator.onLine) {
                            util.sendMessageToTab(tab, {status: 'error', error: 'Oops! You must be online to save this page.'});
                            return;
                        }

                        util.sendMessageToTab(tab, {status: 'error', error: xhr.getResponseHeader('X-Error')});
                    }, 100);
                }
            });
        }

        // Add a context menu entry for links to add them to the queue
        chrome.contextMenus.create({
            'title': 'Send to Feweekly',
            'contexts': ['page', 'frame', 'editable', 'image', 'video', 'audio', 'link', 'selection'],
            'onclick': handler
        });

    }());

    // Listener for messages
    util.addMessageListener(function messageListenerCallback(request, sender, sendResponse) {
        var tabId, url, title;

        if (request.action === 'getSetting') {
            sendResponse({'value': util.getSetting(request.key)});
            return false;

        } else if (request.action === 'setSetting') {
            util.setSetting(request.key, request.value);

            broadcastMessageToAllTabs({
                action: 'settingChanged',
                key: request.key,
                value: request.value
            });

            sendResponse({});
            return false;

        } else if (request.action === 'openTab') {
            util.openTabWithURL(request.url);
            sendResponse({});
            return false;

        } else if (request.action === 'addURL') {
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

                    util.executeScriptInTab(sender.tab, 'window.___FEWKLY__URL_SAVED = "' + url + '"');
                    util.sendMessageToTab(sender.tab, {status: 'success'});
                    sendResponse({status: 'success'});
                },
                error: function (status, xhr) {
                    // Inject the error message into the overlay
                    setTimeout(function () {
                        // Check for online status
                        if (!navigator.onLine) {
                            util.sendMessageToTab(sender.tab, {status: 'error', error: 'Oops! You must be online to save this page.'});
                            return;
                        }

                        util.sendMessageToTab(sender.tab, {status: 'error', error: xhr.getResponseHeader('X-Error')});
                    }, 100);

                    sendResponse({status: 'error'});
                }
            });

            return true;
        }
    });


    // Handles clicks on the page action, browser action in Chrome and Safaris toolbar item
    function handleSaveToFeweekly(tab, inUrl) {
        var title = tab.title,
            url   = inUrl || tab.url;

        feweekly.log('handleSaveToFeweekly', url);

        if (!feweekly.isSubscribed()) {
            authentication.showSubscribeWindow(tab, function () {
                handleSaveToFeweekly(tab, inUrl);
            });
            return;
        }

        if (!util.isValidURL(url)) {
            showInvalidURLNotification(tab);
            return;
        }

        loadNotificationUIIntoPage(tab, url);

        feweekly.add(title, url, {
            success: function () {
                showSavedToolbarIcon(tab.id);
                util.sendMessageToTab(tab, {'status': 'success'});
                util.executeScriptInTab(tab, 'window.___FEWKLY__URL_SAVED = "' + url + '"');
            },
            error: function (status, xhr) {
                // We have to delay the error message injection to let the
                // overlay have time to initialize
                setTimeout(function () {
                    // Check for online status
                    if (!navigator.onLine) {
                        util.sendMessageToTab(tab, {status: 'error', error: 'Oops! You must be online to save this page.'});
                        return;
                    }

                    util.sendMessageToTab(tab, {status: 'error', error: xhr.getResponseHeader('X-Error')});
                }, 100);
            }
        });
    }

    // Authentication
    authentication = (function () {

        function showSubscribeWindow(targetTab, afterSubscribe) {

            feweekly.currentTab = targetTab;
            feweekly.afterSubscribe = afterSubscribe;

            if (util.isChrome()) {

                // Create a separate window for that

                var width  = 428,
                    height = 385;

                chrome.windows.create({
                    'url': '../html/subscribe.html',
                    'type': 'popup',
                    'width': width,
                    'height': height,
                    'left': Math.floor((screen.width / 2) - ((width + 1) / 2)),
                    'top': Math.floor((screen.height / 2) - (height / 2))
                }, function () {});
            } else if (util.isSafari()) {

                // Show the popover

                var targetWindow = (targetTab && targetTab.browserWindow ? targetTab.browserWindow : safari.application.activeBrowserWindow);
                var toolbarItem;

                // Search for the toolbaritem from the actual tab
                if (targetWindow) {
                    for (var idx = 0; idx < safari.extension.toolbarItems.length; idx++) {
                        if (targetWindow === safari.extension.toolbarItems[idx].browserWindow) {
                            toolbarItem = safari.extension.toolbarItems[idx];
                            break;
                        }
                    }
                }

                if (!toolbarItem) {
                    toolbarItem = safari.extension.toolbarItems[0];
                }

                // Create popover
                if (!toolbarItem.popover) {
                    var popover = safari.extension.createPopover('com.feweekly.safari.subscribe.popover', safari.extension.baseURI + 'html/subscribe.html', 427, 385);
                    toolbarItem.popover = popover;
                }

                // Reset all fields in the popover
                if (toolbarItem && toolbarItem.popover && toolbarItem.popover.contentWindow &&
                    toolbarItem.popover.contentWindow.reset) {
                    toolbarItem.popover.contentWindow.reset();
                }

                toolbarItem.showPopover();
            }
        }

        util.addMessageListener(function (request, sender, sendResponse) {
            if (request.action === 'subscribe') {
                // Handle subscribe message
                feweekly.subscribe(request.email, {
                    success: function () {
                        if (util.isChrome()) {

                            // TODO: Refactor this and the same function in feweekly.js
                            //       to a more central position

                            // After the user successfully logged in remove subscribe
                            // popup for all tabs so the browser / page action will be called
                            util.getAllTabs(function (tabs) {
                                $.each(tabs, function (index, tab) {
                                    chrome.browserAction.setPopup({
                                        tabId: tab.id,
                                        popup: ''
                                    });
                                });
                            });

                            // Send message to all tabs to update the option page
                            util.sendMessage({action: 'updateOptions'});
                        }

                        handleSaveToFeweekly(feweekly.currentTab, feweekly.currentTab.url);

                        sendResponse({status: 'success'});

                    },
                    error: function (xhr) {
                        sendResponse({
                            status: 'error',
                            error: xhr.getResponseHeader('X-Error')
                        });
                    }
                });

                return true;
            } else if (request.action === 'logout') {
                // Handle logout message
                feweekly.logout();

                if (util.isChrome()) {
                    // set subscribe popup for all tabs
                    util.getAllTabs(function (tabs) {
                        $.each(tabs, function (index, tab) {
                            chrome.browserAction.setPopup({
                                tabId: tab.id,
                                popup: '../html/subscribe.html'
                            });
                        });
                    });
                }

                sendResponse({});
                return false;
            } else if (request.action === 'showSubscribeWindow') {
                showSubscribeWindow();
                sendResponse({});
                return false;
            }
        });

        return {
            showSubscribeWindow: showSubscribeWindow
        };
    }());

    chrome.browserAction.onClicked.addListener(handleSaveToFeweekly);

    // Initialization code
    (function initialize() {

        // Default settings
        $.each({
            'keyboard-shortcut': 'true',
            'keyboard-shortcut-add': (util.isMac() ? String.fromCharCode('8984') + '+' + String.fromCharCode('8679') + '+P' : 'ctrl+shift+S')
        }, function (key, value) {
            if (!util.getSetting(key)) {
                util.setSetting(key, value);
            }
        });

        // Change command key in the keyboard shortcut on windows or linux to ctrl
        if (!util.isMac() && util.getSetting('keyboard-shortcut-add').match('command')) {
            util.setSetting('keyboard-shortcut-add', util.getSetting('keyboard-shortcut-add').replace(/command/g, 'ctrl'));
        }

        // Check for first time installation
        if (util.getSetting('installed') !== 'true') {
            util.setSetting('installed', 'true');
            util.openTabWithURL(feweekly.domain + '/pages/display/installed');
        // Show upgrade message
        } else if (SHOW_RELEASE_NOTES && util.getSetting('installed') === 'true' && (!util.getSetting('lastInstalledVersion') || util.getSetting('lastInstalledVersion') !== VERSION)) {
            var browser = util.isChrome() ? 'chrome' : 'safari';
            util.openTabWithURL(feweekly.domain + '/pages/display/updated?browser=' + browser + 'newversion=' + VERSION + '&oldversion=' + util.getSetting('lastInstalledVersion'));
        }

        util.setSetting('lastInstalledVersion', VERSION);

        // TODO remove this
        util.setSetting('debug', true);

    }());
});