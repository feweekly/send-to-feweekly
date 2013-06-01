if (window.THE_FEWKLY_BM) {
    window.THE_FEWKLY_BM.save();
} else {
    var FEWKLY_D = 'www.feweekly.com';

    /**
     * FEWKLY_BM_OVERLAY is the view itself and contains all of the methods to manipute the overlay and messaging.
     * It does not contain any logic for saving or communication with the extension or server.
     */
    var FEWKLY_BM_OVERLAY = function () {
        this.inited = false;
    };

    FEWKLY_BM_OVERLAY.prototype = {
        create: function () {
            // remove any existing elements
            var existingStyle = document.getElementById('FEWKLY_BM_STYLE');
            if (existingStyle) {
                existingStyle.parentNode.removeChild(existingStyle);
            }

            var existingOverlay = document.getElementById('FEWKLY_BM_OVERLAY');
            if (existingOverlay) {
                existingOverlay.parentNode.removeChild(existingOverlay);
            }

            // figure out how much we need to scale the overlay to match the user's zoom level
            var scale = window.innerWidth / screen.availWidth;
            if (scale < 1) {
                scale = 1;
            }

            var userAgent       = window.navigator.userAgent;
            this.isMobile       = (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));
            this.isSafari       = (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1);

            // overlay values
            // TODO exension image url
            var height          = 80 * scale;
            var fontSize        = 20 * scale;
            var lineHeight      = height;
            var logoSrc         = chrome.extension.getURL('img/Feweekly-Chrome-OptionsLogo.png');

            this.shadowHeight = 20;

            this.itemWasSaved = false;

            // TODO refactor css here
            var styles = '\
            #FEWKLY_BM_OVERLAY\
            {\
                visibility:hidden;\
                position:fixed;\
                top:0px !important;\
                left:0px !important;\
                width:100% !important;\
                height:' + height + 'px;\
                -webkit-box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                -moz-box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                -o-box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                z-index:2147483647;\
                background: rgb(239,239,239);\
                background: -moz-linear-gradient(top, rgba(239,239,239,0.98) 0%, rgba(253,253,253,0.98) 100%);\
                background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,239,0.98)), color-stop(100%,rgba(253,253,253,0.98)));\
                background: -webkit-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                background: -o-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                background: -ms-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                background: linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#efefef\', endColorstr=\'#fdfdfd\',GradientType=0 );\
                border-bottom:1px solid white;\
                font-size:' + fontSize + 'px !important;\
                font-family:HelveticaNeue,Helvetica,Arial !important;\
                line-height:' + lineHeight + 'px !important;\
                text-align: left;\
                color: #4b4b4b !important;\
                -webkit-backface-visibility: hidden;\
                -webkit-perspective: 1000;\
            }\
            #FEWKLY_BM_OVERLAY_LOGO\
            {\
                display: block;\
                width: 225px;\
                height: 75px;\
                float: left;\
                background: url(' + logoSrc + ') left center no-repeat;\
            }\
            #FEWKLY_BM_OVERLAY_WRAPPER\
            {\
                padding-left:7%;\
                padding-right: 7%;\
                height: 100%;\
            }\
            #FEWKLY_BM_OVERLAY_LABEL\
            {\
                text-indent:80px;\
                font-weight:bold;\
            }\
            ';

            // add overlay
            var overlay = '\
            <div id="FEWKLY_BM_OVERLAY">\
                <div id="FEWKLY_BM_OVERLAY_WRAPPER">\
                    <a id="FEWKLY_BM_OVERLAY_LOGO" href="http://' + FEWKLY_D + '" target="_blank"></a>\
                    <div id="FEWKLY_BM_OVERLAY_LABEL"></div>\
                </div>\
            </div>\
            ';

            // add to DOM
            var overlayFakeContainer = document.createElement('div');
            overlayFakeContainer.innerHTML = '<style id="FEWKLY_BM_STYLE">' + styles + '</style>' + overlay;

            var bodys = document.getElementsByTagName('body');
            var body = bodys ? bodys[0] : false;

            if (!body) {
                body = document.documentElement;
            }

            body.appendChild(overlayFakeContainer);

            // animate in
            var self = this;
            setTimeout(function () { self.show(); }, 0);

            this.closeToolbarTime = 3000;
            this.mouseIsOverOverlay = false;
        },

        displayMessage: function (msg) {
            document.getElementById('FEWKLY_BM_OVERLAY_LABEL').innerHTML = msg;
        },

        getReadyToHide: function () {
            var self = this;
            clearTimeout(self.hideTO);
            self.hideTO = setTimeout(function () {
                self.hide();
            }, this.closeToolbarTime);
        },

        cancelPendingHide: function () {
            clearTimeout(this.hideTO);
            this.hideTO = undefined;
        },

        show: function () {
            this.hidesOnClick = false;

            this.cancelPendingHide();

            var overlay = document.getElementById('FEWKLY_BM_OVERLAY');
            overlay.style[this.browserPrefix() + 'Transform'] = 'translate3d(0px,' + (0 - overlay.offsetHeight - this.shadowHeight) + 'px,0px)';
            overlay.style.visibility = 'visible';

            var self = this;
            overlay.onclick = function () {
                if (self.hidesOnClick) {
                    self.hide();
                }
            };

            // Don't hide the notification if the mouse is over the UI
            this.mouseIsOverOverlay = false;

            overlay.onmouseover = function () {
                self.cancelPendingHide();
                self.mouseIsOverOverlay = true;
            };

            overlay.onmouseout = function () {
                self.mouseIsOverOverlay = false;
                if (self.itemWasSaved === false) {
                    return;
                }
                self.closeToolbarTime = 1500;
                self.getReadyToHide();
            };

            setTimeout(function () {
                var prefix = self.browserPrefix();
                overlay.style[prefix + 'Transition'] = '-' + prefix + '-transform 0.3s ease-out';
                overlay.style[prefix + 'Transform'] = 'translate3d(0px,0px,0px)';

                if (self.isSafari) {
                    // Oh Safari ... we cannot have position:fixed and transform, transition
                    // values, because the notification ui will stick at the top of the window
                    // while the user scrolls so we remove it after the slide in animation
                    setTimeout(function () {
                        overlay.style[prefix + 'Transition'] = '';
                        overlay.style[prefix + 'Transform'] = '';
                    }, 300);
                }

            }, 1);
        },

        hide: function () {
            if (this.mouseIsOverOverlay) return;

            var hideDelay = 0.3;

            var overlay = document.getElementById('FEWKLY_BM_OVERLAY');
            var prefix = this.browserPrefix();
            if (this.isSafari) {
                // We removed the Transition style in the show method now we have
                // to readd it
                overlay.style[prefix + 'Transition'] = '-' + prefix + '-transform ' +  hideDelay  + 's ease-out';
            }
            overlay.style[prefix + 'Transform'] = 'translate3d(0px,' + (0 - overlay.offsetHeight - this.shadowHeight) + 'px,0px)';


            setTimeout(function () {
                overlay.style.visibility = 'hidden';
                overlay.parentNode.removeChild(overlay);
            }, hideDelay * 1000);

            if (this.windowResizeHandler && window.removeEventListener) {
                window.removeEventListener("resize", this.windowResizeHandler);
            }
        },

        wasSaved: function () {
            var self = this;
            setTimeout(function () {
                self.itemWasSaved = true;
                self.displayMessage(chrome.i18n.getMessage('infoSaved'));
                self.getReadyToHide();
            }, 30);

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
    var FEWKLY_BM = function () {};

    FEWKLY_BM.prototype = {
        init: function () {
            if (this.inited) {
                return;
            }

            this.overlay = new FEWKLY_BM_OVERLAY();
            this.inited = true;
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
                if (window.chrome.extension.sendMessage) {
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

            if (window.___FEWKLY__URL_TO_SAVE) {
                this.urlToSave = window.___FEWKLY__URL_TO_SAVE;
                window.___FEWKLY__URL_TO_SAVE = undefined;
            }

            if (window.___FEWKLY__URL_SAVED === this.urlToSave) {
                this.overlay.wasSaved();
            } else {
                this.overlay.displayMessage(chrome.i18n.getMessage('infoSaving'));
                this.addMessageListener(function (request) {
                    self.handleMessageResponse(request);
                });
            }
        },

    };

    // make sure the page has fully loaded before trying anything
    window.setTimeout(function () {
        if (!window.THE_FEWKLY_BM) {
            var THE_FEWKLY_BM = new FEWKLY_BM();
            window.THE_FEWKLY_BM = THE_FEWKLY_BM;
            THE_FEWKLY_BM.init();
        }

        window.THE_FEWKLY_BM.save();
        window.THE_FEWKLY_BM.sendMessage({
            action: "ready",
            url: this.urlToSave || window.location.toString()
        }, function () {});
    }, 1);

}
