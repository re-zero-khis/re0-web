'use strict';

var ReactDOM = require('react-dom');

var getPayload = require('./getPayload');
var createContext = require('./createContext');
var renderWithContext = require('./renderWithContext');

/**
 * Bootstrap GitBook on the browser (this function should not be called on the server side).
 * @param {Object} matching
 */
function bootstrap(matching) {
    var initialState = getPayload(window.document);
    var plugins = window.gitbookPlugins;

    var mountNode = document.getElementById('content');

    // Create the redux store
    var context = createContext(plugins, initialState);

    window.gitbookContext = context;

    // Render with the store
    var el = renderWithContext(context, matching);

    ReactDOM.render(el, mountNode);
}

module.exports = bootstrap;