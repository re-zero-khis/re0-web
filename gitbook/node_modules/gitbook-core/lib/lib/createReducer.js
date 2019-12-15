"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Helper to create a reducer that extend the store.
 *
 * @param  {String} property
 * @param  {Function(state, action): state} reduce
 * @return {Function(state, action): state}
 */
function createReducer(name, reduce) {
    return function (state, action) {
        var value = state[name];
        var newValue = reduce(value, action);

        if (newValue === value) {
            return state;
        }

        var newState = _extends({}, state, _defineProperty({}, name, newValue));

        return newState;
    };
}

module.exports = createReducer;