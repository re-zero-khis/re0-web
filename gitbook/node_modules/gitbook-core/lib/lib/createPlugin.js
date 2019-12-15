'use strict';

var Plugin = require('../models/Plugin');

/**
 * Create a plugin to extend the state and the views.
 *
 * @param  {Function(dispatch, state)} plugin.init
 * @param  {Function(state, action)} plugin.reduce
 * @param  {Object} plugin.actions
 * @return {Plugin}
 */
function createPlugin(_ref) {
    var activate = _ref.activate,
        deactivate = _ref.deactivate,
        reduce = _ref.reduce,
        actions = _ref.actions;

    var plugin = new Plugin({
        activate: activate,
        deactivate: deactivate,
        reduce: reduce,
        actions: actions
    });

    if (typeof window !== 'undefined') {
        window.gitbookPlugins = window.gitbookPlugins || [];
        window.gitbookPlugins.push(plugin);
    }

    return plugin;
}

module.exports = createPlugin;