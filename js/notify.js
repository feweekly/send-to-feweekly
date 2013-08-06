/* globals Autocomplete */
(function () {
    var FEWEEKLY_DOMAIN = 'www.feweekly.com',
        EDITOR_MODE_NULL = 0,
        EDITOR_MODE_COMMENT = 1,
        EDITOR_MODE_TAG = 2,
        FeweeklyMessenger,
        FeweeklyOverlay;

    // execution context
    function bind(func, context) {
        if (func.bind) {
            return func.bind(context);
        }
        return function () {
            return func.apply(context, arguments);
        };
    }

    /**
     * FeweeklyOverlay is the view itself and contains all of the methods to manipute the overlay and messaging.
     * It does not contain any logic for saving or communication with the extension or server.
     */
    FeweeklyOverlay = function (options) {
        this.onSaveComment = options.onSaveComment;
        this.onSaveTags = options.onSaveTags;
        this.onGetTags = options.onGetTags;
    };

    FeweeklyOverlay.prototype = {
        create: function () {
            // remove any existing elements
            var ndOverlay = $('#j-feweekly-overlay');
            if (ndOverlay) { ndOverlay.remove(); }

            var userAgent = window.navigator.userAgent;
            this.isSafari = (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1);

            this.shadowHeight = 20;

            // add overlay
            var overlay = '' +
            '<div id="j-feweekly-overlay">' +
                '<div id="j-feweekly-overlay-wrapper">' +
                    '<a id="j-feweekly-overlay-logo" href="http://' + FEWEEKLY_DOMAIN + '" target="_blank"></a>' +
                    '<div id="j-feweekly-overlay-message"></div>' +
                    '<div id="j-feweekly-comment-wrapper" style="display:none">' +
                        '<textarea id="j-feweekly-comment-input" name="feweekly-comment-input"></textarea>' +
                    '</div>' +
                    '<div id="j-feweekly-tag-wrapper" style="display:none">' +
                        '<div id="j-feweekly-tag-wrapper-inner">' +
                            '<input type="text" id="j-feweekly-tag-input" name="feweekly-tag-input" />' +
                        '</div>' +
                    '</div>' +
                    '<div id="j-feweekly-button-wrapper">' +
                        '<span id="j-feweekly-button-comment" style="display:none;" class="feweekly-btn feweekly-btn--large feweekly-btn--warning"></span>' +
                        '<span id="j-feweekly-button-tag" style="display:none;" class="feweekly-btn feweekly-btn--large feweekly-btn--warning"></span>' +
                        '<span id="j-feweekly-button-save" style="display:none;" class="feweekly-btn feweekly-btn--large feweekly-btn--success"></span>' +
                        '<span id="j-feweekly-button-close" style="display:none;" class="feweekly-btn feweekly-btn--large"></span>' +
                    '</div>' +
                '</div>' +
            '</div>';

            // add to DOM
            $('body').append(overlay);

            // animate in
            var self = this;
            setTimeout(function () { self.show(); }, 0);

            this.overlayCloseTimeout = 3000;
            this.isMouseOnOverlay = false;
            this.isItemSaved = false;

            // element handle
            this.ndOverlay = $('#j-feweekly-overlay');
            this.ndMessage = $('#j-feweekly-overlay-message');

            this.ndCommentWrapper = $('#j-feweekly-comment-wrapper');
            this.ndComment = $('#j-feweekly-comment-input');

            this.ndTagWrapper = $('#j-feweekly-tag-wrapper');
            this.ndTag = $('#j-feweekly-tag-input');

            this.ndBtnClose = $('#j-feweekly-button-close');
            this.ndBtnSave = $('#j-feweekly-button-save');
            this.ndBtnComment = $('#j-feweekly-button-comment');
            this.ndBtnTag = $('#j-feweekly-button-tag');

            this.ndBtnClose.text(chrome.i18n.getMessage('btnClose'));
            this.ndBtnSave.text(chrome.i18n.getMessage('btnSave'));
            this.ndBtnComment.text(chrome.i18n.getMessage('btnComment'));
            this.ndBtnTag.text(chrome.i18n.getMessage('btnTag'));
        },

        displayMessage: function (msg) {
            this.ndMessage.html(msg);
        },

        getReadyToHide: function () {
            var self = this;
            window.clearTimeout(self.overlayCloseTimer);
            self.overlayCloseTimer = window.setTimeout(function () {
                self.hide();
            }, this.overlayCloseTimeout);
        },

        cancelPendingHide: function () {
            window.clearTimeout(this.overlayCloseTimer);
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
            this.isMouseOnOverlay = false;
            this.isEditorOpen = false;
            this.isTagsLoaded = false;
            this.editorMode = EDITOR_MODE_NULL;

            this.ndOverlay.on('mouseover', function () {
                self.cancelPendingHide();
                self.isMouseOnOverlay = true;
            });

            this.ndOverlay.on('mouseout', function () {
                if (self.isEditorOpen) { return; }
                self.isMouseOnOverlay = false;
                if (self.isItemSaved === false) { return; }
                self.overlayCloseTimeout = 1500;
                self.getReadyToHide();
            });

            this.ndBtnClose.on('click', function () {
                self.isMouseOnOverlay = false;
                self.isEditorOpen = false;
                self.hide();
            });

            this.ndBtnComment.on('click', function () {
                console.log('feweekly.notify.comment');
                self.editorMode = EDITOR_MODE_COMMENT;
                self.openEditor();
            });

            this.ndBtnTag.on('click', function () {
                console.log('feweekly.notify.tag');
                if (self.isTagsLoaded) {
                    self.editorMode = EDITOR_MODE_TAG;
                    self.openEditor();
                } else {
                    self.onGetTags();
                }
            });

            this.ndBtnSave.on('click', function () {
                switch (self.editorMode) {
                case EDITOR_MODE_COMMENT:
                    self.onSaveComment(self.trim(self.ndComment.val()));
                    break;
                case EDITOR_MODE_TAG:
                    self.onSaveTags(self.trim(self.ndTag.val()));
                    break;
                }
            });

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
            if (this.isMouseOnOverlay) return;
            if (this.isEditorOpen) return;

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
                self.isItemSaved = true;
                self.displayMessage(chrome.i18n.getMessage('infoPageSaved'));
                self.showEditorButtons();
            }, 30);
        },

        showEditorButtons: function () {
            var self = this;
            setTimeout(function () {
                self.ndBtnComment.show();
                self.ndBtnTag.show();
                self.getReadyToHide();
            }, 30);
        },

        openEditor: function () {
            this.isEditorOpen = true;

            this.ndMessage.hide();

            this.ndBtnClose.show();
            this.ndBtnSave.show();

            this.ndBtnComment.hide();
            this.ndBtnTag.hide();

            switch (this.editorMode) {
            case EDITOR_MODE_COMMENT:
                this.ndCommentWrapper.show();
                this.ndTagWrapper.hide();
                this.ndComment.focus();
                break;
            case EDITOR_MODE_TAG:
                this.ndCommentWrapper.hide();
                this.ndTagWrapper.show();
                this.ndTag.focus();
                break;
            }
        },

        closeEditor: function (editorContentSaved) {
            this.isEditorOpen = false;

            this.ndMessage.show();
            this.ndCommentWrapper.hide();
            this.ndTagWrapper.hide();

            this.ndBtnSave.hide();

            // 如果保存成功，退出编辑模式，显示另外1个功能的按钮
            // 否则按照当前的编辑器状态显示按钮
            if (editorContentSaved) {
                switch (this.editorMode) {
                case EDITOR_MODE_COMMENT:
                    this.ndBtnComment.hide();
                    this.ndBtnTag.show();
                    break;
                case EDITOR_MODE_TAG:
                    this.ndBtnComment.show();
                    this.ndBtnTag.hide();
                    break;
                }
                this.editorMode = EDITOR_MODE_NULL;
            } else {
                switch (this.editorMode) {
                case EDITOR_MODE_COMMENT:
                    this.ndBtnComment.show();
                    this.ndBtnTag.hide();
                    break;
                case EDITOR_MODE_TAG:
                    this.ndBtnComment.hide();
                    this.ndBtnTag.show();
                    break;
                }
            }
        },

        // 设置自动完成
        setTags: function (tags) {
            new Autocomplete("j-feweekly-tag-input", {
                useNativeInterface: false,
                srcType : "array",
                srcData : tags.tags,
                srcCleanData : tags.usedTags
            });
            this.editorMode = EDITOR_MODE_TAG;
            this.isTagsLoaded = true;
            this.openEditor();
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

            this.overlay = new FeweeklyOverlay({
                onSaveComment: bind(this.saveComment, this),
                onSaveTags: bind(this.saveTags, this),
                onGetTags: bind(this.getTags, this)
            });

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

        sendMessage: function (message, callback) {
            if (this.isChrome()) {
                if (window.chrome.runtime.sendMessage) {
                    window.chrome.runtime.sendMessage(message, callback);
                } else if (window.chrome.extension.sendMessage) {
                    window.chrome.extension.sendMessage(message, callback);
                } else {
                    window.chrome.extension.sendRequest(message, callback);
                }
            } else if (this.isSafari()) {
                // if (callback) {
                //     message["__cbId"] = Callbacker.addCb(callback);
                // }

                safari.self.tab.dispatchMessage("message", message);
            }
        },

        savePage: function () {
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
                this.overlay.displayMessage(chrome.i18n.getMessage('infoPageSaving'));
                this.addMessageListener(function (response) {
                    self.handlePageResponse(response);
                });
                this.sendMessage({
                    action: "addPage",
                    showSavedToolbarIcon: true,
                    title: document.title,
                    url: window.location.toString(),
                    data: window.__getFeweeklyClearlyResults()
                }, function () {});
            }
        },

        handlePageResponse: function (response) {
            if (response.status === "success") {
                this.overlay.wasSaved();
            } else if (response.status === "error") {
                // Tried to use a bookmarklet that was created for a different account
                this.overlay.displayMessage("Error!");
                this.overlay.hide();
            }
        },

        saveComment: function (comment) {
            var self = this;

            if (!comment) {
                this.overlay.closeEditor();
                this.overlay.displayMessage(chrome.i18n.getMessage('infoCommentEmpty'));
            } else {
                this.addMessageListener(function (response) {
                    self.handleCommentResponse(response);
                });
                this.sendMessage({
                    action: "addComment",
                    url: window.location.toString(),
                    data: comment
                }, function () {});
            }
        },

        handleCommentResponse: function (response) {
            this.overlay.closeEditor(true);
            this.overlay.getReadyToHide();
            if (response.status === "success") {
                this.overlay.displayMessage(chrome.i18n.getMessage('infoCommentSaved'));
            } else if (response.status === "error") {
                this.overlay.displayMessage(chrome.i18n.getMessage('infoError'));
            }
        },

        getTags: function () {
            var self = this;
            this.overlay.displayMessage(chrome.i18n.getMessage('infoTagLoading'));
            this.sendMessage({action: "getTags"}, function (response) {
                self.overlay.setTags(response);
            });
        },

        saveTags: function (tags) {
            if (!tags) {
                this.overlay.closeEditor();
                this.overlay.displayMessage(chrome.i18n.getMessage('infoTagEmpty'));
            } else {
                this.sendMessage({
                    action: "addTags",
                    url: window.location.toString(),
                    tags: tags.split(/[,|，]\s*/).join(',')
                }, bind(this.handleTagResponse, this));
            }
        },

        handleTagResponse: function (response) {
            this.overlay.closeEditor(true);
            this.overlay.getReadyToHide();
            if (response.status === "success") {
                this.overlay.displayMessage(chrome.i18n.getMessage('infoTagSaved'));
            } else if (response.status === "error") {
                this.overlay.displayMessage(chrome.i18n.getMessage('infoError'));
            }
        }

    };

    // 真正的处理逻辑
    if (window.__feweeklyMessenger) {
        window.__feweeklyMessenger.savePage();
    } else {
        // make sure the page has fully loaded before trying anything
        window.setTimeout(function () {
            if (!window.__feweeklyMessenger) {
                window.__feweeklyMessenger = new FeweeklyMessenger();
                window.__feweeklyMessenger.init();
            }

            window.__feweeklyMessenger.savePage();
        }, 1);
    }
})();
