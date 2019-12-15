'use strict';

var ACTION_TYPES = require('../actions/TYPES');
var File = require('../models/File');

module.exports = function (state, action) {
    state = File.create(state);

    switch (action.type) {

        case ACTION_TYPES.PAGE_FETCH_END:
            return state.merge(action.payload.file);

        default:
            return state;

    }
};