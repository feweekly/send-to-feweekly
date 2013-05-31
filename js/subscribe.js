/* globals util */
(function () {
    var ndTip, ndEmail, ndButton, ndForm;

    window.reset = function reset() {
        ndTip.removeClass('error');
        ndTip.html('如果您已经订阅了feweekly，请填写您的邮箱，以便计算您的贡献值！');
        ndEmail.set('value', '');
    };

    function startSubscribe(tab) {
        var email = ndEmail.val();
        if (email === '') {
            ndTip.addClass('error');
            ndTip.html('请填写邮箱地址');
            return;
        } else {
            ndTip.removeClass('error');
            ndTip.html('请稍后...');
        }

        var onSuccess = function () {
            if (util.isChrome()) {
                // If the subscribe page is open in a separate window, close it
                this.close();
            } else if (util.isSafari()) {
                // Close popover
                util.sendMessageToTab(tab, {action: 'updateOptions'});
                safari.extension.popovers[0].hide();

                // Remove all popovers from the toolbars
                var toolbarItems = safari.extension.toolbarItems;
                for (var i = 0; i < toolbarItems.length; i++) {
                    var toolbarItem = toolbarItems[i];
                    if (toolbarItem.idenfifier === 'pocket' && toolbarItem.popover) {
                        toolbarItem.popover = null;
                    }
                    toolbarItem.validate();
                }
                safari.extension.removePopover('com.feweekly.safari.subscribe.popover');
            }
        };

        var onError = function () {
            ndTip.addClass('error');
            ndTip.html('您的邮箱不正确');
        };

        if (util.isChrome()) {
            var message = {
                tab: tab,
                action: 'subscribe',
                email: email
            };

            util.sendMessage(message, function (response) {
                if (response.status === 'error') {
                    onError(response.error);
                } else if (response.status === 'success') {
                    onSuccess();
                }
            });
        } else if (util.isSafari()) {
            safari.extension.globalPage.contentWindow.feweekly.subscribe(email, {
                success: onSuccess,
                error: onError
            });
        }
    }

    function initialize() {
        ndTip = $('#j-tip');
        ndEmail = $('#j-email');
        ndForm = $('#j-form');
        ndButton = $('#j-subscribe-button');

        ndForm.on('submit', function (event) {
            event.preventDefault();
            ndButton.addClass('disabled');
            util.getCurrentTab(function (tab) {
                startSubscribe(tab);
            });
        });

        // We need to set a timer here because the email will not be
        // selected if we don't have a delay
        setTimeout(function () {
            ndEmail.focus();
        }, 200);
    }

    window.onload = initialize;

}());
