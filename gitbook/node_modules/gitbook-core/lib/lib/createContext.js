'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable no-console */
var Redux = require('redux');
var ReduxThunk = require('redux-thunk').default;

var Plugin = require('../models/Plugin');
var Context = require('../models/Context');
var coreReducers = require('../reducers');
var composeReducer = require('./composeReducer');

var Components = require('../actions/components');
var I18n = require('../actions/i18n');
var History = require('../actions/history');

var isBrowser = typeof window !== 'undefined';

/**
 * The core plugin defines the defualt behaviour of GitBook and provides
 * actions to other plugins.
 * @type {Plugin}
 */
var corePlugin = new Plugin({
    reduce: coreReducers,
    actions: {
        Components: Components, I18n: I18n, History: History
    }
});

/**
 * Create a new context containing redux store from an initial state and a list of plugins.
 * Each plugin entry is the result of {createPlugin}.
 *
 * @param  {Array<Plugin>} plugins
 * @param  {Object} initialState
 * @return {Context} context
 */
function createContext(plugins, initialState) {
    plugins = [corePlugin].concat(plugins);

    // Compose the reducer from core with plugins
    var pluginReducers = plugins.map(function (plugin) {
        return plugin.reduce;
    });
    var reducer = composeReducer.apply(undefined, _toConsumableArray(pluginReducers));

    // Get actions from all plugins
    var actions = plugins.reduce(function (accu, plugin) {
        return Object.assign(accu, plugin.actions);
    }, {});

    // Create thunk middleware which include actions
    var thunk = ReduxThunk.withExtraArgument(actions);

    // Create the redux store
    var store = Redux.createStore(function (state, action) {
        if (isBrowser) {
            console.log('[store]', action.type);
        }
        return reducer(state, action);
    }, initialState, Redux.compose(Redux.applyMiddleware(thunk)));

    // Create the context
    var context = new Context({
        store: store,
        plugins: plugins,
        actions: actions
    });

    // Initialize the plugins
    context.activate();

    return context;
}

module.exports = createContext;