/* globals util */
var feweekly = (function () {

    var controbuteAPI = '/news_letter/contributions/add',
        subscribeAPI = '/news_letter/subscribes/add',
        domain = 'http://www.feweekly.com',
        domainDebug = 'http://www.dev.feweekly.com',
        version = '0.0.1',
        showReleaseNotes = true;

    function isSubscribed() {
        return util.getSetting('email') !== undefined;
    }

    function isDebug() {
        return util.getSetting('debug') !== undefined && util.getSetting('debug');
    }

    /**
     * Submit a link to feweeekly
     * @param {String} title
     * @param {String} url
     * @param {Object} options
     */
    function add(title, url, options) {
        var data = {
            email: util.getSetting('email'),
            url: url,
            title: title
        };

        if (options.referer) {
            data.referer = options.referer;
        }

        feweekly.log('add', JSON.stringify(data));

        $.ajax({
            url: feweekly.domain + controbuteAPI,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (response) {
                feweekly.log('add.complete', JSON.stringify(response));

                if (response.status) {
                    options.success(response);
                } else {
                    options.error(response);
                }
            },
            error: function (request) {
                options.error(request.status, request);
            }
        });
    }

    /**
     * Subscribe to feweekly
     * @param {String} label
     * @param {Object} data
     */
    function subscribe(email, callbacks) {
        if (feweekly.isSubscribed()) return;

        feweekly.log('subscribe', JSON.stringify(email));

        try {
            $.ajax({
                url: feweekly.domain + subscribeAPI,
                type: 'POST',
                data: {
                    'data[email]': email,
                    'data[source]': util.isChrome() ? 'chrome' : 'safari',
                },
                dataType: 'json',
                success: function (response) {
                    feweekly.log('subscribe.complete', JSON.stringify(response));

                    if (response.status) {
                        util.setSetting('email', email);
                    }

                    callbacks.success();
                },
                error: function (request) {
                    callbacks.error(request.status, request);
                }
            });
        } catch (e) {}
    }

    /**
     * Debug utility
     * @param {String} label
     * @param {Object} data
     */
    function log(label, data) {
        if (isDebug()) {
            console.log('feweekly.' + label + ': ' + JSON.stringify(data));
        }
    }

    return {
        add: add,
        subscribe: subscribe,
        log: log,
        version: version,
        debug: isDebug(),
        domain: isDebug() ? domainDebug : domain,
        isSubscribed: isSubscribed,
        showReleaseNotes: showReleaseNotes
    };

}());
