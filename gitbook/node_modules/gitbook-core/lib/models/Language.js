'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    Record = _require.Record;

var DEFAULTS = {
    id: null,
    title: null
};

var Language = function (_Record) {
    _inherits(Language, _Record);

    function Language() {
        _classCallCheck(this, Language);

        return _possibleConstructorReturn(this, (Language.__proto__ || Object.getPrototypeOf(Language)).apply(this, arguments));
    }

    return Language;
}(Record(DEFAULTS));

module.exports = Language;