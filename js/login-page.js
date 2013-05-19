(function () {
    var forgotLinkURL = "http://www.dev.feweekly.com/forgot/",
        createAccountLinkURL;

    if (isChrome()) {
        createAccountLinkURL = "http://www.dev.feweekly.com/signup/?src=chromex";
    }
    else {
        createAccountLinkURL = "http://www.dev.feweekly.com/signup/?src=safarix";
    }

    function reset() {
        var subtextField = document.getElementById("subtext-field");
        subtextField.setAttribute("class", "");
        subtextField.innerHTML = 'You can log into Feweekly with your subscribing email.';

        var usernameField = document.getElementById("username-field");
        var passwordField = document.getElementById("password-field");

        usernameField.value = "";
        passwordField.value = "";
    }
    window.reset = reset;

    function openLinkInNewTab(url) {
        if (isSafari()) {
            var tab = safari.application.activeBrowserWindow.openTab();
            tab.url = url;
            safari.extension.popovers[0].hide();
        }
        else {
            chrome.tabs.create({'url': url}, function (tab) {
                chrome.tabs.update(tab.id, {selected: true});
            });
        }
    }

    function loginAction() {
        getCurrentTab(function (tab) {
            startLogin(tab);
        });
    }

    function startLogin(tab) {
        var error_field = document.getElementById("subtext-field");
        error_field.setAttribute("class", "");
        error_field.innerHTML = "Logging in...";

        var username = document.getElementById("username-field").value;
        var password = document.getElementById("password-field").value;

        var onSuccess = function () {
            if (isChrome()) {
                // If the login page is open in a separate window, close it
                this.close();
            }
            else if (isSafari()) {
                // Close popover
                sendMessageToTab(tab, {action: "updateOptions"});
                safari.extension.popovers[0].hide();

                // Remove all popovers from the toolbars
                var toolbarItems = safari.extension.toolbarItems;
                for (var i = 0; i < toolbarItems.length; i++) {
                    var toolbarItem = toolbarItems[i];
                    if (toolbarItem.idenfifier === "pocket" && toolbarItem.popover) {
                        toolbarItem.popover = null;
                    }
                    toolbarItem.validate();
                }
                safari.extension.removePopover("com.ideashower.pocket.safari.login.popover");
            }
        };

        var onError = function (error) {
            error_field.setAttribute("class", "error");
            error_field.innerHTML = "The username and or password you entered was incorrect.";
            error_field.style.display = "block";
        };

        if (isChrome()) {
            var message = {
                tab: tab,
                action: "login",
                username: username,
                password: password
            };

            sendMessage(message, function (response) {
                if (response.status == "error") {
                    onError(response.error);
                }
                else if (response.status == "success") {
                    onSuccess();
                }
            });
        }
        else if (isSafari()) {
            safari.extension.globalPage.contentWindow.ril.login(username, password, {
                success: onSuccess,
                error: onError
            });
        }
    }

    function keypressed() {
        // Hitting enter should submit login form
        if (event.keyCode == '13') {
            loginAction();
        }
    }

    function init() {
        // Get the tab to close the popup after the login
        $('#login-button-link').click(function (evt) {
            loginAction();
            evt.preventDefault();
        });

        // Signup and Forgot Password links
        $('#create-account-link').click(function (evt) {
            openLinkInNewTab(createAccountLinkURL);
            evt.preventDefault();
        });

        $('#forgot-password-link').click(function (evt) {
            openLinkInNewTab(forgotLinkURL);
            evt.preventDefault();
        });

        if (isSafari()) {
            window.onkeydown = keypressed;
        } else {
            window.onkeyup = keypressed;
        }

        // We need to set a timer here because the username-field will not be
        // selected if we don't have a delay
        setTimeout(function () {
            $('#username-field').focus();
        }, 200);
    }

    window.onload = init;

}());
