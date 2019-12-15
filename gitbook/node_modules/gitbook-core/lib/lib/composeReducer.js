"use strict";

/**
 * Compose multiple reducers into one
 * @param  {Function} reducers
 * @return {Function}
 */
function composeReducer() {
    for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
        reducers[_key] = arguments[_key];
    }

    return function (state, action) {
        return reducers.reduce(function (newState, reducer) {
            return reducer(newState, action);
        }, state);
    };
}

module.exports = composeReducer;