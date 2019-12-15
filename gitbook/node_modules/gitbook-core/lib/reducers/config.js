'use strict';

var _require = require('immutable'),
    fromJS = _require.fromJS;

var ACTION_TYPES = require('../actions/TYPES');

module.exports = function (state, action) {
    state = fromJS(state);
    switch (action.type) {

        case ACTION_TYPES.PAGE_FETCH_END:
            return fromJS(action.payload.config);

        default:
            return state;

    }
};