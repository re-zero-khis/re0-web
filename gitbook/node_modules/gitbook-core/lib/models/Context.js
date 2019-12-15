'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    Record = _require.Record,
    List = _require.List;

var DEFAULTS = {
    store: null,
    actions: {},
    plugins: List()
};

var Context = function (_Record) {
    _inherits(Context, _Record);

    function Context() {
        var _ref;

        _classCallCheck(this, Context);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Context.__proto__ || Object.getPrototypeOf(Context)).call.apply(_ref, [this].concat(args)));

        _this.dispatch = _this.dispatch.bind(_this);
        _this.getState = _this.getState.bind(_this);
        return _this;
    }

    /**
     * Return current state
     * @return {Object}
     */


    _createClass(Context, [{
        key: 'getState',
        value: function getState() {
            var store = this.store;

            return store.getState();
        }

        /**
         * Dispatch an action
         * @param {Action} action
         */

    }, {
        key: 'dispatch',
        value: function dispatch(action) {
            var store = this.store;

            return store.dispatch(action);
        }

        /**
         * Deactivate the context, cleanup resources from plugins.
         */

    }, {
        key: 'deactivate',
        value: function deactivate() {
            var _this2 = this;

            var plugins = this.plugins,
                actions = this.actions;


            plugins.forEach(function (plugin) {
                plugin.deactivate(_this2.dispatch, _this2.getState, actions);
            });
        }

        /**
         * Activate the context and the plugins.
         */

    }, {
        key: 'activate',
        value: function activate() {
            var _this3 = this;

            var plugins = this.plugins,
                actions = this.actions;


            plugins.forEach(function (plugin) {
                plugin.activate(_this3.dispatch, _this3.getState, actions);
            });
        }
    }]);

    return Context;
}(Record(DEFAULTS));

module.exports = Context;