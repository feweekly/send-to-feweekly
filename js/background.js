/* globals util, feweekly */
$(function () {
    var VERSION = feweekly.version,
        // SHOW_RELEASE_NOTES = feweekly.showReleaseNotes,
        authentication;

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
        util.sendMessageToTab(tab, {status: 'error', error: chrome.i18n.getMessage('errorInvalid')});
    }

    function loadNotificationUIIntoPage(tab, url, callback) {
        if (url) {
            util.executeScriptInTab(tab, 'window.__feweeklyUrlToSave = "' + url + '"');
        }
        util.insertCssFromUrlInTab(tab, 'css/notify.css', function () {
            util.executeMultiScriptFromURLInTab(tab, [
                'js/html2markdown/htmldomparser.js',
                'js/html2markdown/html2markdown.js',
                'js/zepto.min.js',
                'vendor/Autocomplete/Autocomplete.js',
                'js/clearly.js',
                'js/notify.js'
            ], callback);
        });
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

            loadNotificationUIIntoPage(tab, url, function () {
                console.log('feweekly.addPage.fromContextMenu');
            });
        }

        // Add a context menu entry for links to add them to the queue
        chrome.contextMenus.create({
            'title': chrome.i18n.getMessage("contextMenu"),
            'contexts': ['page', 'frame', 'editable', 'image', 'video', 'audio', 'link', 'selection'],
            'onclick': handler
        });

    }());

    // Listener for messages
    util.addMessageListener(function messageListenerCallback(request, sender, sendResponse) {
        var tabId, url, title, html, markdown, comment, tags;

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

        // 保存页面内容
        } else if (request.action === 'addPage') {
            tabId = (sender && sender.tab && sender.tab.id ? sender.tab.id : null);
            title = request.data.title || request.title;
            url = request.url;
            html = request.data.html;
            markdown = request.data.markdown;

            var images = request.data.images || [],
                links = request.data.links || [],
                videos = request.data.videos || [];

            feweekly.addPage({title: title, url: url, html: html, markdown: markdown, images: images, videos: videos, links: links}, {
                success: function () {
                    if (request.showSavedToolbarIcon && request.showSavedToolbarIcon === true) {
                        showSavedToolbarIcon(tabId);
                    }

                    util.executeScriptInTab(sender.tab, 'window.__feweeklyUrlSaved = "' + url + '"');
                    util.sendMessageToTab(sender.tab, {status: 'success'});
                    sendResponse({status: 'success'});
                },
                error: function (status) {
                    // Inject the error message into the overlay
                    setTimeout(function () {
                        // Check for online status
                        if (!navigator.onLine) {
                            util.sendMessageToTab(sender.tab, {status: 'error', error: chrome.i18n.getMessage('errorOffline')});
                            return;
                        }

                        util.sendMessageToTab(sender.tab, {status: 'error', error: chrome.i18n.getMessage('infoError')});
                    }, 100);

                    sendResponse({status: 'error'});
                }
            });

            return true;

        // 保存摘要
        } else if (request.action === 'addComment') {
            url = request.url;
            comment = request.data;

            feweekly.addComment({url: url, comment: comment}, {
                success: function () {
                    util.sendMessageToTab(sender.tab, {status: 'success'});
                    sendResponse({status: 'success'});
                },
                error: function (status) {
                    setTimeout(function () {
                        if (!navigator.onLine) {
                            util.sendMessageToTab(sender.tab, {status: 'error', error: chrome.i18n.getMessage('errorOffline')});
                            return;
                        }

                        util.sendMessageToTab(sender.tab, {status: 'error', error: chrome.i18n.getMessage('infoError')});
                    }, 100);

                    sendResponse({status: 'error'});
                }
            });

            return true;

        // 加载tags
        } else if (request.action === "getTags") {
            var callback = function () {
                // Get tags list
                var tagsJSON = util.getSetting("tags"),
                    tags = "";

                if (tagsJSON) {
                    tags = JSON.parse(tagsJSON);
                }

                // Get used tags list
                var usedTagsJSON = util.getSetting("usedTags"),
                    usedTags = [];

                if (usedTagsJSON) {
                    var usedTagsObject = JSON.parse(usedTagsJSON);
                    var usedTagsObjectArray = [];
                    for (var tagKey in usedTagsObject) {
                        usedTagsObjectArray.push(usedTagsObject[tagKey]);
                    }

                    // Sort usedTagsObjectArray based on count
                    usedTagsObjectArray.sort(function (a, b) {
                        a = new Date(a.timestamp);
                        b = new Date(b.timestamp);
                        return a < b ? -1 : a > b ? 1 : 0;
                    });

                    // Get all keys tags
                    for (var j = 0; j < usedTagsObjectArray.length; j++) {
                        usedTags.push(usedTagsObjectArray[j].tag);
                    }

                    // Reverse to set the last recent used tags to the front
                    usedTags.reverse();
                }

                feweekly.log('background.getTags', {"tags": tags, "usedTags": usedTags});

                sendResponse({"tags": tags, "usedTags": usedTags});
            };

            feweekly.getTags({
                success: callback,
                error: callback
            });

            return true;

        // 添加标签
        } else if (request.action === "addTags") {
            tabId = (sender && sender.tab && sender.tab.id ? sender.tab.id : null);

            url = request.url;
            tags = request.tags;

            feweekly.addTags({url: url, tags: tags}, {
                success: function () {
                    var usedTagsJSON = util.getSetting("usedTags"),
                        usedTags = usedTagsJSON ? JSON.parse(usedTagsJSON) : {};

                    // Check for each tag if it's already in the used tags
                    if (typeof tags === 'string') {
                        tags = tags.split(',');
                    }
                    for (var i = 0; i < tags.length; i++) {
                        var tagToSave = tags[i].trim();
                        var newUsedTagObject = {
                            "tag": tagToSave,
                            "timestamp": new Date()
                        };
                        usedTags[tagToSave] = newUsedTagObject;
                    }
                    util.setSetting("usedTags", JSON.stringify(usedTags));

                    sendResponse({status: "success"});
                },
                error: function () {
                    sendResponse({status: 'error'});
                }
            });

            return true;

        } else if (request.action === 'openTab') {
            util.openTabWithURL(request.url);
            sendResponse({});
            return false;

        } else if (request.action === 'addURL') {
            if (!util.isValidURL(request.url)) {
                showInvalidURLNotification(sender.tab);
                return false;
            }

            loadNotificationUIIntoPage(sender.tab, request.url, function () {
                console.log('feweekly.addUrl.loadNotificationUIIntoPage');
            });
        }

        return true;
    });

    // Handles clicks on the page action, browser action in Chrome and Safaris toolbar item
    function handleSaveToFeweekly(tab, inUrl) {
        var url   = inUrl || tab.url;

        feweekly.log('handleSaveToFeweekly', url);

        if (!feweekly.isSubscribed()) {
            feweekly.log('handleSaveToFeweekly', 'user not subscribed');
            authentication.showSubscribeWindow(tab, function () {
                handleSaveToFeweekly(tab, inUrl);
            });
            return;
        }

        if (!util.isValidURL(url)) {
            feweekly.log('handleSaveToFeweekly', 'url not valid');
            showInvalidURLNotification(tab);
            return;
        }

        loadNotificationUIIntoPage(tab, url, function () {
            console.log('feweekly.addPage.handleSaveToFeweekly');
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

                        // trigger saveToFeweekly when there exists currentTab
                        if (feweekly.currentTab) {
                            window.setTimeout(function () {
                                handleSaveToFeweekly(feweekly.currentTab, feweekly.currentTab.url);
                            }, 200);
                        }

                        sendResponse({status: 'success'});

                    },
                    error: function () {
                        sendResponse({
                            status: 'error',
                            error: chrome.i18n.getMessage('infoError'),
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
            'keyboard-shortcut-add': (util.isMac() ? String.fromCharCode('8984') + '+' + String.fromCharCode('8679') + '+S' : 'ctrl+shift+S')
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
        // if (util.getSetting('installed') !== 'true') {
        //     util.setSetting('installed', 'true');
        //     util.openTabWithURL(feweekly.getDomain() + '/pages/display/installed');
        // Show upgrade message
        // } else if (SHOW_RELEASE_NOTES && util.getSetting('installed') === 'true' && (!util.getSetting('lastInstalledVersion') || util.getSetting('lastInstalledVersion') !== VERSION)) {
        //     var browser = util.isChrome() ? 'chrome' : 'safari';
        //     util.openTabWithURL(feweekly.getDomain() + '/pages/display/updated?browser=' + browser + 'newversion=' + VERSION + '&oldversion=' + util.getSetting('lastInstalledVersion'));
        // }

        util.setSetting('lastInstalledVersion', VERSION);
        util.setSetting('debug', true);

    }());
});
