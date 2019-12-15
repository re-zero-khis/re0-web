'use strict';

var _require = require('immutable'),
    Record = _require.Record,
    List = _require.List;

var _require2 = require('history'),
    createBrowserHistory = _require2.createBrowserHistory,
    createMemoryHistory = _require2.createMemoryHistory;

var ACTION_TYPES = require('../actions/TYPES');
var Location = require('../models/Location');

var isServerSide = typeof window === 'undefined';

var HistoryState = Record({
    // Current location
    location: new Location(),
    // Are we loading a new page
    loading: Boolean(false),
    // Did we fail loading a page?
    error: null,
    // Listener for history changes
    listeners: List(),
    // Function to call to stop listening
    unlisten: null,
    // HistoryJS instance
    client: null
});

function reduceHistory(state, action) {
    state = state || HistoryState();
    switch (action.type) {

        case ACTION_TYPES.PAGE_FETCH_START:
            return state.merge({
                loading: true
            });

        case ACTION_TYPES.PAGE_FETCH_END:
            return state.merge({
                loading: false
            });

        case ACTION_TYPES.PAGE_FETCH_ERROR:
            return state.merge({
                loading: false,
                error: action.error
            });

        case ACTION_TYPES.HISTORY_ACTIVATE:
            var client = isServerSide ? createMemoryHistory() : createBrowserHistory();
            var unlisten = client.listen(action.listener);

            // We can't use .merge since it convert history to an immutable
            var newState = state
            // TODO: we should find a way to have the correct location on server side
            .set('location', isServerSide ? new Location() : Location.fromNative(window.location)).set('client', client).set('unlisten', unlisten);

            return newState;

        case ACTION_TYPES.HISTORY_DEACTIVATE:
            if (state.unlisten) {
                state.unlisten();
            }

            return state.merge({
                client: null,
                unlisten: null
            });

        case ACTION_TYPES.HISTORY_UPDATE:
            return state.merge({
                location: action.location
            });

        case ACTION_TYPES.HISTORY_LISTEN:
            return state.merge({
                listeners: state.listeners.push(action.listener)
            });

        default:
            return state;

    }
}

module.exports = reduceHistory;