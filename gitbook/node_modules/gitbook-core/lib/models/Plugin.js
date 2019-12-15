'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    Record = _require.Record;

var DEFAULTS = {
    activate: function activate(dispatch, getState) {},
    deactivate: function deactivate(dispatch, getState) {},
    reduce: function reduce(state, action) {
        return state;
    },
    actions: {}
};

var Plugin = function (_Record) {
    _inherits(Plugin, _Record);

    function Plugin(plugin) {
        _classCallCheck(this, Plugin);

        return _possibleConstructorReturn(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this, {
            activate: plugin.activate || DEFAULTS.activate,
            deactivate: plugin.deactivate || DEFAULTS.deactivate,
            reduce: plugin.reduce || DEFAULTS.reduce,
            actions: plugin.actions || DEFAULTS.actions
        }));
    }

    return Plugin;
}(Record(DEFAULTS));

module.exports = Plugin;