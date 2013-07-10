/* globals util */
var feweekly = (function () {

    var contributeAPI = '/contributions/add',
        updateAPI = '/contributions/update',
        subscribeAPI = '/subscribes/add',
        domain = 'http://www.feweekly.com',
        domainDebug = 'http://www.dev.feweekly.com',
        version = '0.0.2',
        showReleaseNotes = true;

    function isSubscribed() {
        return util.getSetting('email') !== undefined;
    }

    function isDebug() {
        return util.getSetting('debug') !== undefined && util.getSetting('debug');
    }

    function getDomain() {
        return isDebug() ? domainDebug : domain;
    }

    /**
     * Add comment for a link
     * @param {String} url
     * @param {Object} options
     */
    function update(data, options) {
        var postData = {
            url: data.url,
            email: util.getSetting('email'),
            comment: data.comment
        };

        feweekly.log('update', JSON.stringify(postData));

        $.ajax({
            url: feweekly.getDomain() + updateAPI,
            type: 'POST',
            data: postData,
            dataType: 'json',
            success: function (response) {
                feweekly.log('update.complete', JSON.stringify(response));
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
     * Submit a link to feweeekly
     * @param {Object} data
     * @param {Object} options
     */
    function add(data, options) {
        var postData = {
            email: util.getSetting('email'),
            url: data.url,
            title: data.title,
            content: data.markdown || data.html,
            links: JSON.stringify(data.links || []),
            images: JSON.stringify(data.images || []),
            videos: JSON.stringify(data.videos || [])
        };

        feweekly.log('add', JSON.stringify(postData));

        $.ajax({
            url: feweekly.getDomain() + contributeAPI,
            type: 'POST',
            data: postData,
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
                url: feweekly.getDomain() + subscribeAPI,
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
        update: update,
        subscribe: subscribe,
        isSubscribed: isSubscribed,
        isDebug: isDebug,
        getDomain: getDomain,
        log: log,
        version: version,
        showReleaseNotes: showReleaseNotes
    };

}());
