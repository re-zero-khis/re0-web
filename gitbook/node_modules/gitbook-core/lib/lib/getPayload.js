'use strict';

/**
 * Get the payload for a GitBook page
 * @param  {String|DOMDocument} html
 * @return {Object}
 */
function getPayload(html) {
    if (typeof html === 'string') {
        var parser = new DOMParser();
        html = parser.parseFromString(html, 'text/html');
    }

    var script = html.querySelector('script[type="application/payload+json"]');
    var payload = JSON.parse(script.innerHTML);

    return payload;
}

module.exports = getPayload;