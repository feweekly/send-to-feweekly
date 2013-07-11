/* globals util */
var feweekly = (function () {

    var contributeAPI = '/contributions/add',
        commentAPI = '/contributions/comment',
        getTagsAPI = '/contributions/tags',
        addTagsAPI = '/contributions/tag',
        subscribeAPI = '/subscribes/add',
        domain = 'http://www.feweekly.com',
        domainDebug = 'http://www.dev.feweekly.com',
        tagsCacheExpire = 24 * 60 * 60,
        // tagsCacheExpire = 0,
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
    function addComment(data, options) {
        if (!feweekly.isSubscribed()) return;

        var postData = {
            url: data.url,
            email: util.getSetting('email'),
            comment: data.comment
        };

        feweekly.log('addComment', JSON.stringify(postData));

        $.ajax({
            url: feweekly.getDomain() + commentAPI,
            type: 'POST',
            data: postData,
            dataType: 'json',
            success: function (response) {
                feweekly.log('addComment.complete', JSON.stringify(response));
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
    function addPage(data, options) {
        if (!feweekly.isSubscribed()) return;

        var postData = {
            email: util.getSetting('email'),
            url: data.url,
            title: data.title,
            content: data.markdown || data.html,
            links: JSON.stringify(data.links || []),
            images: JSON.stringify(data.images || []),
            videos: JSON.stringify(data.videos || [])
        };

        feweekly.log('addPage', JSON.stringify(postData));

        $.ajax({
            url: feweekly.getDomain() + contributeAPI,
            type: 'POST',
            data: postData,
            dataType: 'json',
            success: function (response) {
                feweekly.log('addPage.complete', JSON.stringify(response));

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
    }

    /**
     * get tags for contributions * Cache for 1 day
     * @param {Object} options
     */
    function getTags(options) {
        if (!feweekly.isSubscribed()) return;

        options = options || {};

        var tsTagsUpdatedSince = util.getSetting('tsTagsUpdatedSince'),
            tsNow = (new Date().getTime() / 1000).toFixed(0);

        // check for cache expire
        if (!feweekly.isDebug() && (tsTagsUpdatedSince + tagsCacheExpire) > tsNow) {
            return options.success();
        }

        $.ajax({
            url: feweekly.getDomain() + getTagsAPI,
            type: 'get',
            dataType: 'json',
            success: function (response) {
                feweekly.log('getTags.complete', JSON.stringify(response));

                if (response.tags) {
                    // If a tagslist is in the response replace the tags
                    util.setSetting('tags', JSON.stringify(response.tags));
                }

                // Save since value for further requests
                util.setSetting('tsTagsUpdatedSince', tsNow);

                if (options.success) {
                    options.success();
                }

            },
            error: function () {
                if (options.error) {
                    options.error();
                }
            }
        });
    }

    /**
     * add tags for contribution
     * @param {Object} data
     */
    function addTags(data, options) {
        if (!feweekly.isSubscribed()) return;

        var postData = {
            email: util.getSetting('email'),
            url: data.url,
            tags: data.tags
        };

        feweekly.log('addTags', JSON.stringify(postData));

        $.ajax({
            url: feweekly.getDomain() + addTagsAPI,
            type: 'POST',
            data: postData,
            dataType: 'json',
            success: function (response) {
                feweekly.log('addTags.complete', JSON.stringify(response));

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
        addPage: addPage,
        addComment: addComment,
        addTags: addTags,
        getTags: getTags,
        subscribe: subscribe,
        isSubscribed: isSubscribed,
        isDebug: isDebug,
        getDomain: getDomain,
        log: log,
        version: version,
        showReleaseNotes: showReleaseNotes
    };

}());
