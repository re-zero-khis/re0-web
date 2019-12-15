'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    Record = _require.Record,
    List = _require.List;

var File = require('../models/File');
var SummaryPart = require('../models/SummaryPart');

var SummaryState = function (_Record) {
    _inherits(SummaryState, _Record);

    function SummaryState() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, SummaryState);

        return _possibleConstructorReturn(this, (SummaryState.__proto__ || Object.getPrototypeOf(SummaryState)).call(this, _extends({}, state, {
            file: new File(state.file),
            parts: new List(state.parts).map(function (article) {
                return new SummaryPart(article);
            })
        })));
    }

    _createClass(SummaryState, null, [{
        key: 'create',
        value: function create(state) {
            return state instanceof SummaryState ? state : new SummaryState(state);
        }
    }]);

    return SummaryState;
}(Record({
    file: new File(),
    parts: List()
}));

module.exports = function (state, action) {
    return SummaryState.create(state);
};