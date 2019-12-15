'use strict';

var Languages = require('../models/Languages');

module.exports = function (state, action) {
    state = Languages.create(state);

    switch (action.type) {

        default:
            return state;

    }
};