var feweekly = (function () {

    var api = "http://www.dev.feweekly.com/news_letter/contributions/add",
        domain = "http://www.feweekly.com",
        version = '0.0.1',
        showReleaseNotes = true,
        debug = true;

    /**
     * Submit a link to feweeekly
     * @param {String} title
     * @param {String} url
     * @param {Object} options
     */
    function add(title, url, options) {
        var data = {
            url: url,
            title: title
        };

        if (options.referer) {
            data.referer = options.referer;
        }

        feweekly.log('add', JSON.stringify(data));

        $.ajax({
            url: api,
            type: "POST",
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
            error: function (xhr) {
                options.error(xhr.status, xhr);
            }
        });
    }

    /**
     * Debug utility
     * @param {String} label
     * @param {Object} data
     */
    function log(label, data) {
        if (debug) {
            console.log('feweekly.' + label + ': ' + JSON.stringify(data));
        }
    }

    return {
        add: add,
        log: log,
        version: version,
        debug: debug,
        domain: domain,
        showReleaseNotes: showReleaseNotes
    };

}());
