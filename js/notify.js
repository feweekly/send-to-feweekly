(function () {
    var FEWEEKLY_DOMAIN = 'www.feweekly.com',
        FeweeklyMessenger,
        FeweeklyOverlay;

    /**
     * FeweeklyOverlay is the view itself and contains all of the methods to manipute the overlay and messaging.
     * It does not contain any logic for saving or communication with the extension or server.
     */
    FeweeklyOverlay = function () { };

    FeweeklyOverlay.prototype = {
        create: function () {
            // remove any existing elements
            var ndOverlay = $('#j-feweekly-overlay');
            if (ndOverlay) { ndOverlay.remove(); }

            var userAgent = window.navigator.userAgent;
            this.isSafari = (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1);

            this.shadowHeight = 20;
            this.itemWasSaved = false;

            // add overlay
            var overlay = '' +
            '<div id="j-feweekly-overlay">' +
                '<div id="j-feweekly-overlay-wrapper">' +
                    '<div id="j-feweekly-overlay-btn-wrapper" style="display:none">' +
                        '<span id="j-feweekly-overlay-close" class="feweekly-btn feweekly-btn--large"></span>' +
                        '<span id="j-feweekly-overlay-edit" class="feweekly-btn feweekly-btn--large feweekly-btn--danger"></span>' +
                        '<span id="j-feweekly-overlay-save" class="feweekly-btn feweekly-btn--large feweekly-btn--success"></span>' +
                    '</div>' +
                    '<a id="j-feweekly-overlay-logo" href="http://' + FEWEEKLY_DOMAIN + '" target="_blank"></a>' +
                    '<div id="j-feweekly-overlay-message"></div>' +
                    '<div id="j-feweekly-overlay-input-wrapper" style="display:none">' +
                        '<textarea id="j-feweekly-overlay-input" name="feweekly-overlay-input"></textarea>' +
                    '</div>' +
                '</div>' +
            '</div>';

            // add to DOM
            $('body').append(overlay);

            // animate in
            var self = this;
            setTimeout(function () { self.show(); }, 0);

            this.overlayCloseTimeout = 3000;
            this.mouseIsOverOverlay = false;

            // element handle
            this.ndOverlay = $('#j-feweekly-overlay');
            this.ndMessage = $('#j-feweekly-overlay-message');
            this.ndInputWrapper = $('#j-feweekly-overlay-input-wrapper');
            this.ndInput = $('#j-feweekly-overlay-input');
            this.ndBtnWrapper = $('#j-feweekly-overlay-btn-wrapper');
            this.ndBtnClose = $('#j-feweekly-overlay-close');
            this.ndBtnEdit = $('#j-feweekly-overlay-edit');
            this.ndBtnSave = $('#j-feweekly-overlay-save');

            this.ndBtnSave.text(chrome.i18n.getMessage('btnSave'));
            this.ndBtnEdit.text(chrome.i18n.getMessage('btnComment'));
            this.ndBtnClose.text(chrome.i18n.getMessage('btnClose'));
        },

        displayMessage: function (msg) {
            this.ndMessage.html(msg);
        },

        getReadyToHide: function () {
            var self = this;
            clearTimeout(self.overlayCloseTimer);
            self.overlayCloseTimer = setTimeout(function () {
                self.hide();
            }, this.overlayCloseTimeout);
        },

        cancelPendingHide: function () {
            clearTimeout(this.overlayCloseTimer);
            this.overlayCloseTimer = undefined;
        },

        show: function () {
            this.cancelPendingHide();

            var self = this,
                prefix = self.browserPrefix(),
                transitionProperty = prefix + 'Transition',
                transformProperty = prefix + 'Transform',
                overlay = document.getElementById('j-feweekly-overlay');

            overlay.style[transformProperty] = 'translate3d(0px,' + (0 - overlay.offsetHeight - this.shadowHeight) + 'px,0px)';
            overlay.style.visibility = 'visible';

            // TODO fix animation here
            // this.ndOverlay.css(prefix + 'Transform', 'translate3d(0px,' + (0 - this.ndOverlay.height() - this.shadowHeight) + 'px,0px)');
            // this.ndOverlay.css('visibility', 'visible');

            // Don't hide the notification if the mouse is over the UI
            this.mouseIsOverOverlay = false;
            this.isDescriptionInputOpen = false;

            this.ndOverlay.on('mouseover', function () {
                self.cancelPendingHide();
                self.mouseIsOverOverlay = true;
            });

            this.ndOverlay.on('mouseout', function () {
                if (self.isDescriptionInputOpen) { return; }
                self.mouseIsOverOverlay = false;
                if (self.itemWasSaved === false) { return; }
                self.overlayCloseTimeout = 1500;
                self.getReadyToHide();
            });

            this.ndBtnClose.on('click', function () {
                self.mouseIsOverOverlay = false;
                self.isDescriptionInputOpen = false;
                self.hide();
            });

            this.ndBtnEdit.on('click', function () {
                self.editDescription();
            });

            this.ndBtnSave.on('click', function () {
                self.saveDescription();
            });

            // this.ndInput.on('blur', function () {
            //     self.mouseIsOverOverlay = false;
            //     self.isDescriptionInputOpen = false;
            //     self.getReadyToHide();
            // });

            setTimeout(function () {
                overlay.style[transitionProperty] = '-' + prefix + '-transform 0.3s ease-out';
                overlay.style[transformProperty] = 'translate3d(0px,0px,0px)';

                // TODO fix animation here
                // self.ndOverlay.css(transitionProperty, '-' + prefix + '-transform 0.3s ease-out');
                // self.ndOverlay.css(transformProperty, 'translate3d(0px,0px,0px)');

                if (self.isSafari) {
                    // Oh Safari ... we cannot have position:fixed and transform, transition
                    // values, because the notification ui will stick at the top of the window
                    // while the user scrolls so we remove it after the slide in animation
                    setTimeout(function () {
                        overlay.style[transitionProperty] = '';
                        overlay.style[transformProperty] = '';

                        // TODO fix animation here
                        // self.ndOverlay.css(transitionProperty, '');
                        // self.ndOverlay.css(transformProperty, '');
                    }, 300);
                }

            }, 1);
        },

        hide: function () {
            if (this.mouseIsOverOverlay) return;
            if (this.isDescriptionInputOpen) return;

            var hideDelay = 0.3,
                self = this,
                prefix = this.browserPrefix(),
                overlay = document.getElementById('j-feweekly-overlay'),
                transitionProperty = prefix + 'Transition',
                transformProperty = prefix + 'Transform';

            if (this.isSafari) {
                overlay.style[transitionProperty] = '-' + prefix + '-transform ' +  hideDelay  + 's ease-out';
                // We removed the Transition style in the show method now we have to readd it
                // this.ndOverlay.css(transitionProperty, '-' + prefix + '-transform ' +  hideDelay  + 's ease-out');
            }
            overlay.style[transformProperty] = 'translate3d(0px,' + (0 - overlay.offsetHeight - this.shadowHeight) + 'px,0px)';
            // this.ndOverlay.css(transformProperty, 'translate3d(0px,' + (0 - this.ndOverlay.height() - this.shadowHeight) + 'px,0px)');

            setTimeout(function () {
                self.ndOverlay.css('visibility', 'hidden');
                self.ndOverlay.remove();
            }, hideDelay * 1000);
        },

        wasSaved: function () {
            var self = this;
            setTimeout(function () {
                self.itemWasSaved = true;
                self.displayMessage(chrome.i18n.getMessage('infoSaved'));
                self.showInputButtons();
            }, 30);
        },

        showInputButtons: function () {
            var self = this;
            setTimeout(function () {
                self.ndBtnSave.hide();
                self.ndBtnWrapper.show();
                self.getReadyToHide();
            }, 30);
        },

        saveDescription: function () {
            var self = this,
                description = this.trim(this.ndInput.val());

            if (!description) {
                this.discardDescription();
                this.displayMessage(chrome.i18n.getMessage('infoDescriptionEmpty'));
            } else {
                // TODO refactor
                window.__feweeklyMessenger.addMessageListener(function (request) {
                    self.handleDescriptionResponse(request);
                });
                window.__feweeklyMessenger.sendMessage({
                    action: "sendDescription",
                    url: window.location.toString(),
                    data: description
                }, function () {});
            }
        },

        handleDescriptionResponse: function (response) {
            this.discardDescription();
            this.getReadyToHide();
            if (response.status === "success") {
                this.displayMessage(chrome.i18n.getMessage('infoDescriptionSaved'));
            } else if (response.status === "error") {
                // Tried to use a bookmarklet that was created for a different account
                this.displayMessage(chrome.i18n.getMessage('infoDescriptionError'));
            }
        },

        editDescription: function () {
            this.isDescriptionInputOpen = true;
            this.ndMessage.hide();
            this.ndBtnEdit.hide();
            this.ndBtnSave.show();
            this.ndInputWrapper.show();
            this.ndInput.focus();
        },

        discardDescription: function () {
            this.isDescriptionInputOpen = false;
            this.ndInputWrapper.hide();
            this.ndMessage.show();
            this.ndBtnSave.hide();
            this.ndBtnEdit.show();
        },

        browserPrefix: function () {
            if (this._prefix)
                return this._prefix;

            var el = document.createElement('div');

            var prefixes = ['Webkit', 'Moz', 'MS', 'O'];
            for (var i in prefixes) {
                if (el.style[prefixes[i] + 'Transition'] !== undefined) {
                    this._prefix = prefixes[i];
                    return this._prefix;
                }
            }
        },

        trim: function (str) {
            str = str.replace(/^\s\s*/, '');

            var ws = /\s/,
                i = str.length - 1;

            while (ws.test(str.charAt(i))) {
                i--;
            }

            return str.slice(0, i + 1);
        }

    };

    // Layer between Bookmarklet and Extensions
    FeweeklyMessenger = function () {};

    FeweeklyMessenger.prototype = {
        init: function () {
            if (this.initialized) {
                return;
            }

            this.overlay = new FeweeklyOverlay();
            this.initialized = true;
            this.requestListener = undefined;
        },

        isChrome: function () {
            return window["chrome"] !== undefined && window.chrome.app;
        },

        isSafari: function () {
            return window["safari"] !== undefined;
        },

        addMessageListener: function (listener) {
            // Remove event listener if one is currently registered
            if (this.requestListener !== undefined) {
                this.removeMessageListener();
            }

            // Add request listener
            if (this.isChrome()) {
                this.requestListener = listener;
                chrome.extension.onMessage.addListener(listener);
            } else if (this.isSafari()) {
                this.requestListener = function (thingy) {
                    listener(thingy.message, thingy);
                };
                window.safari.self.addEventListener("message", this.requestListener);
            }
        },

        removeMessageListener: function () {
            if (this.isChrome()) {
                chrome.extension.onMessage.removeListener(this.requestListener);
            } else if (this.isSafari()) {
                window.safari.self.removeEventListener("message", this.requestListener);
            }
            this.requestListener = undefined;
        },

        sendMessage: function (message, cb) {
            if (this.isChrome()) {
                if (window.chrome.runtime.sendMessage) {
                    window.chrome.runtime.sendMessage(message, cb);
                } else if (window.chrome.extension.sendMessage) {
                    window.chrome.extension.sendMessage(message, cb);
                } else {
                    window.chrome.extension.sendRequest(message, cb);
                }
            } else if (this.isSafari()) {
                // if (cb) {
                //     message["__cbId"] = Callbacker.addCb(cb);
                // }

                safari.self.tab.dispatchMessage("message", message);
            }
        },

        handleMessageResponse: function (response) {
            if (response.status === "success") {
                this.overlay.wasSaved();
            } else if (response.status === "error") {
                // Tried to use a bookmarklet that was created for a different account
                this.overlay.displayMessage("Error!");
                this.overlay.hide();
            }
        },

        save: function () {
            var self = this;

            this.overlay.create();

            if (window.__feweeklyUrlToSave) {
                this.urlToSave = window.__feweeklyUrlToSave;
                window.__feweeklyUrlToSave = undefined;
            }

            // 如果已经保存，只显示保存成功的提示，不发请求
            if (window.__feweeklyUrlSaved === this.urlToSave) {
                this.overlay.wasSaved();
            } else {
                this.overlay.displayMessage(chrome.i18n.getMessage('infoSaving'));
                this.addMessageListener(function (request) {
                    self.handleMessageResponse(request);
                });
            }
        },

    };

    // 真正的处理逻辑
    if (window.__feweeklyMessenger) {
        window.__feweeklyMessenger.save();
    } else {
        // make sure the page has fully loaded before trying anything
        window.setTimeout(function () {
            if (!window.__feweeklyMessenger) {
                window.__feweeklyMessenger = new FeweeklyMessenger();
                window.__feweeklyMessenger.init();
            }

            window.__feweeklyMessenger.save();
            window.__feweeklyMessenger.sendMessage({
                action: "sendPage",
                showSavedToolbarIcon: true,
                title: document.title,
                url: window.location.toString(),
                data: window.__getFeweeklyClearlyResults()
            }, function () {});
        }, 1);
    }
})();
