'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _robox = require('robox');

var _robox2 = _interopRequireDefault(_robox);

var _ruled = require('ruled');

var _ruled2 = _interopRequireDefault(_ruled);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getWidth = function getWidth(props) {
  return function () {
    var matches = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    return matches.reduce(function (a, b) {
      return props[b] || a;
    }, props.col || null);
  };
};

var bgGrid = (0, _ruled2.default)();

var QUERIES = Object.create(null);

function getMatchMedia(query) {
  if (!(query in QUERIES)) {
    QUERIES[query] = window.matchMedia(query);
  }

  return QUERIES[query];
}

var withReflex = function withReflex() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$listen = _ref.listen,
      listen = _ref$listen === undefined ? true : _ref$listen;

  return function (Comp) {
    var Base = (0, _robox2.default)(Comp);

    var ReflexWrap = function (_React$Component) {
      _inherits(ReflexWrap, _React$Component);

      function ReflexWrap() {
        _classCallCheck(this, ReflexWrap);

        var _this = _possibleConstructorReturn(this, (ReflexWrap.__proto__ || Object.getPrototypeOf(ReflexWrap)).call(this));

        _this.state = {
          matches: ['server']
        };

        _this.getBreakpoints = function () {
          var _config$_this$context = _extends({}, _config2.default, _this.context.reflexbox),
              breakpoints = _config$_this$context.breakpoints;

          return breakpoints;
        };

        _this.match = function () {
          if (_this._unmounted) {
            return;
          }

          var breakpoints = _this.getBreakpoints();
          var matches = [];

          for (var key in breakpoints) {
            var match = getMatchMedia(breakpoints[key]).matches;
            if (match) {
              matches.push(key);
            }
          }

          _this.setState({ matches: matches });
        };
        return _this;
      }

      _createClass(ReflexWrap, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var breakpoints = this.getBreakpoints();
          this.match();

          if (listen) {
            for (var key in breakpoints) {
              getMatchMedia(breakpoints[key]).addListener(this.match);
            }
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this._unmounted = true;

          var breakpoints = this.getBreakpoints();
          for (var key in breakpoints) {
            getMatchMedia(breakpoints[key]).removeListener(this.match);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props,
              debug = _props.debug,
              style = _props.style,
              props = _objectWithoutProperties(_props, ['debug', 'style']);

          var matches = this.state.matches;

          var breakpoints = this.getBreakpoints();
          var grid = debug || (this.context.reflex ? this.context.reflex.debug : false);

          Object.keys(breakpoints).forEach(function (key) {
            delete props[key];
          });

          var width = getWidth(this.props)(matches);

          var sx = grid ? _extends({
            backgroundImage: bgGrid,
            backgroundSize: '8px 8px'
          }, style) : style || null;

          // Map legacy props
          if (props.column) {
            props.flexColumn = props.column;
            delete props.column;
          }

          if (props.auto) {
            props.flexAuto = props.auto;
            delete props.auto;
          }

          return _react2.default.createElement(Base, _extends({}, props, {
            col: width,
            style: sx }));
        }
      }]);

      return ReflexWrap;
    }(_react2.default.Component);

    ReflexWrap.contextTypes = {
      reflexbox: _react2.default.PropTypes.shape({
        breakpoints: _react2.default.PropTypes.object,
        debug: _react2.default.PropTypes.bool
      })
    };

    ReflexWrap.propTypes = {
      flex: _react2.default.PropTypes.bool,
      wrap: _react2.default.PropTypes.bool,
      flexColumn: _react2.default.PropTypes.bool,
      column: _react2.default.PropTypes.bool,
      align: _react2.default.PropTypes.oneOf(['stretch', 'center', 'baseline', 'flex-start', 'flex-end']),
      justify: _react2.default.PropTypes.oneOf(['center', 'space-around', 'space-between', 'flex-start', 'flex-end']),
      flexAuto: _react2.default.PropTypes.bool,
      auto: _react2.default.PropTypes.bool,
      flexNone: _react2.default.PropTypes.bool,
      order: _react2.default.PropTypes.number,
      col: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      sm: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      md: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      lg: _react2.default.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
      is: function is(props, propName, componentName) {
        if (props[propName]) {
          return new Error('Warning! Deprecated prop `' + propName + '` supplied to' + ' `' + componentName + '`. Use the Reflex higher order component instead. https://github.com/jxnblk/reflexbox/');
        }
      }
    };

    return ReflexWrap;
  };
};

exports.default = withReflex;