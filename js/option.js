/* globals util */
(function () {

    function updateUI() {
        var emailField = document.getElementById("email-field");
        var subscribeLinkWrapper = document.getElementById("subscribe-link-wrapper");

        util.sendMessage({action: "getSetting", key: "email"}, function (response) {
            var email = response.value;
            if (email) {
                emailField.innerHTML = email;
                emailField.style.display = "inline";
                subscribeLinkWrapper.style.display = "none";
            } else {
                emailField.style.display = "none";
                subscribeLinkWrapper.style.display = "inline";
            }

            util.sendMessage({action: "getSetting", key: 'keyboard-shortcut-add'}, function (response) {
                var keyboardShortcut = response.value;
                if (keyboardShortcut !== undefined) {
                    $('#keyboard-shortcut-text').val(keyboardShortcut);
                }
                updateShortcutInfo();
            });
        });
    }

    // Keyboard Shortcut
    function validKeyboardShortcut(keyboardShortcut) {
        // Check the key combo
        // The regex:
        //
        // starts with (one or more) of     alt / shift / ctrl / command and a plus
        // then (zero or more) of           a-z / 0-9 (only one) and a plus
        // then ends with                   a-z / 0-9 (only one)
        if (keyboardShortcut.length > 0 && keyboardShortcut.match(/^(((alt|shift|ctrl|command|⌘|⌥|⌃|⇧)\+)+([a-z0-9]{1}\+)*([a-z0-9]{1}))$/gi) === null) {
            return false;
        }
        return true;
    }

    function init() {

        (function initLinks() {
            $('#subscribe-link').click(function () {
                util.sendMessage({action: "showSubscribeWindow"});
            });

            $('#search-support-link').click(function (e) {
                var searchSupportLink = "http://help.feweekly.com";
                util.sendMessage({action: "openTab", url: searchSupportLink});
                e.preventDefault();
            });

            $('#send-us-an-email-link').click(function (e) {
                var emailURL = "mailto:feweeklymaster@gmail.com?subject=Question about Feweekly Extension for " + (util.isChrome() ? "Chrome" : "Safari");
                util.sendMessage({action: "openTab", url: emailURL});
                e.preventDefault();
            });

        }());

        (function initKeyboardShortcuts() {
            // IE doesn't support Array#indexOf, so have a simple replacement
            function index(array, item) {
                var i = array.length;
                while (i--) {
                    if (array[i] === item) return i;
                }
                return -1;
            }

            // Placeholder strings for mac and windows
            var placeholderString = (util.isMac() ? '⌘+⇧+S' : 'ctrl+shift+S');
            $('#keyboard-shortcut-text').attr('placeholder', placeholderString);

            // Variables for transformation between keyCode and strings that
            // keymaster.js understands
                // modifier keys
            var shift = util.isMac() ? '⇧' : 'shift',
                alt = util.isMac() ? '⌥' : 'alt',
                ctrl = util.isMac() ? '⌃' : 'ctrl',
                cmd = util.isMac() ? '⌘' : 'command',
                _MODIFIERS = {
                    16: shift,
                    18: alt,
                    17: ctrl,
                    91: cmd
                },
                // special keys
                _MAP = {
                    8: 'backspace',
                    9: 'tab',
                    12: 'clear',
                    13: 'enter',
                    27: 'esc',
                    32: 'space',
                    37: 'left',
                    38: 'up',
                    39: 'right',
                    40: 'down',
                    46: 'del',
                    36: 'home',
                    35: 'end',
                    33: 'pageup',
                    34: 'pagedown',
                    188: ',',
                    190: '.',
                    191: '/',
                    192: '`',
                    189: '-',
                    187: '=',
                    186: ';',
                    222: '\'',
                    219: '[',
                    221: ']',
                    220: '\\'
                };

            // On keydown try to get the human readable form of the pressed keys
            // and join all keys with a + for keymaster.js
            var keysPressed = [];
            $('#keyboard-shortcut-text').keydown(function (event) {
                var keyCode = event.keyCode;

                // Backspace key empty the input field
                if (keyCode === 8) {
                    $(this).val('');
                } else if (keyCode === 13 || keyCode === 27) {
                    $(this).blur();
                } else {
                    // Get key
                    var keyString = _MODIFIERS[keyCode] ||
                                    _MAP[keyCode] ||
                                    String.fromCharCode(keyCode).toUpperCase();

                    // Check if key already pressed
                    if (index(keysPressed, keyString) === -1) {
                        keysPressed.push(keyString);
                        $(this).val(keysPressed.join("+"));
                    }
                }

                event.preventDefault();
            });

            // Reset the keyPressed array on key up
            $('#keyboard-shortcut-text').keyup(function () {
                keysPressed = [];
            });

            $('#keyboard-shortcut-text').focus(function () {
                this.select();

                // Work around Chrome's little problem
                this.onmouseup = function () {
                    // Prevent further mouseup intervention
                    this.onmouseup = null;
                    return false;
                };

                $(".shortcut-info").text("请按下快捷键");
            });

            // In the focus out try to save the keyboard shortcut
            $('#keyboard-shortcut-text').focusout(function () {
                // If element looses focus save the value

                // Remove error class if there was an error before
                $(this).removeClass("error");

                var keyboardShortcut = $(this).val()
                                 .trim()
                                 // .toUpperCase()
                                 .replace(/[\s\,\&]/gi, '+') // Convert possible spacer characters to pluses
                                 .replace(/[^A-Z0-9⇧⌥⌃⌘\+]/gi, ''); // Strip out almost everything else
                $(this).val(keyboardShortcut);

                var key, value;
                if (keyboardShortcut === "") {
                    // Keyboard shortcut field is empty save the placeholder
                    key = 'keyboard-shortcut-add';
                    value = $('#keyboard-shortcut-text').attr('placeholder');
                    util.sendMessage({action: "setSetting", key: key, value: value});
                } else if (!validKeyboardShortcut(keyboardShortcut)) {
                    $(this).addClass('error');
                } else {
                    key = 'keyboard-shortcut-add';
                    value = keyboardShortcut;
                    util.sendMessage({action: "setSetting", key: key, value: value});
                }

                updateUI();
            });
        }());

        updateUI();

    }

    function updateShortcutInfo() {
        var placeholder = $('#keyboard-shortcut-text').attr('placeholder');
        var keyboardShortcut = $('#keyboard-shortcut-text').val();
        if (placeholder === keyboardShortcut) {
            $(".shortcut-info").text("");
        } else {
            var resetToDefault = $("<a href='#''>恢复默认</a>");
            resetToDefault.click(function (evt) {
                $('#keyboard-shortcut-text').removeClass('error');
                util.sendMessage({action: "setSetting", key: 'keyboard-shortcut-add', value: placeholder});
                updateUI();
                $(".shortcut-info").text("");
                document.body.style.cursor = "default";
                evt.preventDefault();
            });
            $(".shortcut-info").html(resetToDefault);
        }

        util.sendMessage({action: "getSetting", key: 'keyboard-shortcut'}, function (response) {
            var keyboardShortcutEnabled = response.value;
            if (keyboardShortcutEnabled === 'true') {
                $('#keyboard-shortcut-checkbox').attr('checked', true);
            } else {
                $('#keyboard-shortcut-checkbox').attr('checked', false);
            }
        });
    }

    util.addMessageListener(function (request) {
        if (request.action === "updateOptions") {
            updateUI();
        }
    });

    window.onload = init;

}());
