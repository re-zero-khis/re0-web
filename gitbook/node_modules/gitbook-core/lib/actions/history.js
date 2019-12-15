'use strict';

var ACTION_TYPES = require('./TYPES');
var getPayload = require('../lib/getPayload');
var Location = require('../models/Location');

var SUPPORTED = typeof window !== 'undefined' && window.history && window.history.pushState && window.history.replaceState &&
// pushState isn't reliable on iOS until 5.
!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);

/**
 * Initialize the history
 */
function activate() {
    return function (dispatch, getState) {
        dispatch({
            type: ACTION_TYPES.HISTORY_ACTIVATE,
            listener: function listener(location) {
                location = Location.fromNative(location);
                var prevLocation = getState().history.location;

                // Fetch page if required
                if (!prevLocation || location.pathname !== prevLocation.pathname) {
                    dispatch(fetchPage(location.pathname));
                }

                // Signal location to listener
                dispatch(emit());

                // Update the location
                dispatch({
                    type: ACTION_TYPES.HISTORY_UPDATE,
                    location: location
                });
            }
        });

        // Trigger for existing listeners
        dispatch(emit());
    };
}

/**
 * Emit current location
 * @param {List|Array<Function>} to?
 */
function emit(to) {
    return function (dispatch, getState) {
        var _getState$history = getState().history,
            listeners = _getState$history.listeners,
            client = _getState$history.client;


        if (!client) {
            return;
        }

        var location = Location.fromNative(client.location);

        to = to || listeners;

        to.forEach(function (handler) {
            handler(location, dispatch, getState);
        });
    };
}

/**
 * Cleanup the history
 */
function deactivate() {
    return { type: ACTION_TYPES.HISTORY_DEACTIVATE };
}

/**
 * Push a new url into the history
 * @param {String|Location} location
 * @return {Action} action
 */
function push(location) {
    return function (dispatch, getState) {
        var client = getState().history.client;

        location = Location.fromNative(location);

        if (SUPPORTED) {
            client.push(location.toNative());
        } else {
            redirect(location.toString());
        }
    };
}

/**
 * Replace current state in history
 * @param {String|Location} location
 * @return {Action} action
 */
function replace(location) {
    return function (dispatch, getState) {
        var client = getState().history.client;

        location = Location.fromNative(location);

        if (SUPPORTED) {
            client.replace(location.toNative());
        } else {
            redirect(location.toString());
        }
    };
}

/**
 * Hard redirection
 * @param {String} uri
 * @return {Action} action
 */
function redirect(uri) {
    return function () {
        window.location.href = uri;
    };
}

/**
 * Listen to url change
 * @param {Function} listener
 * @return {Action} action
 */
function listen(listener) {
    return function (dispatch, getState) {
        dispatch({ type: ACTION_TYPES.HISTORY_LISTEN, listener: listener });

        // Trigger for existing listeners
        dispatch(emit([listener]));
    };
}

/**
 * Fetch a new page and update the store accordingly
 * @param {String} pathname
 * @return {Action} action
 */
function fetchPage(pathname) {
    return function (dispatch, getState) {
        dispatch({ type: ACTION_TYPES.PAGE_FETCH_START });

        window.fetch(pathname, {
            credentials: 'include'
        }).then(function (response) {
            return response.text();
        }).then(function (html) {
            var payload = getPayload(html);

            if (!payload) {
                throw new Error('No payload found in page');
            }

            dispatch({ type: ACTION_TYPES.PAGE_FETCH_END, payload: payload });
        }).catch(function (error) {
            // dispatch(redirect(pathname));
            dispatch({ type: ACTION_TYPES.PAGE_FETCH_ERROR, error: error });
        });
    };
}

/**
 * Fetch a new article
 * @param {SummaryArticle} article
 * @return {Action} action
 */
function fetchArticle(article) {
    return fetchPage(article.path);
}

module.exports = {
    activate: activate,
    deactivate: deactivate,
    listen: listen,
    push: push,
    replace: replace,
    fetchPage: fetchPage,
    fetchArticle: fetchArticle
};