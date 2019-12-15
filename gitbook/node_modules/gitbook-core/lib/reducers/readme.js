'use strict';

var Readme = require('../models/Readme');

module.exports = function (state, action) {
    return Readme.create(state);
};