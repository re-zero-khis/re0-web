'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    Record = _require.Record,
    Map = _require.Map;

var querystring = require('querystring');

var DEFAULTS = {
    pathname: String(''),
    // Hash without the #
    hash: String(''),
    // If query is a non empty map
    query: Map()
};

var Location = function (_Record) {
    _inherits(Location, _Record);

    function Location() {
        _classCallCheck(this, Location);

        return _possibleConstructorReturn(this, (Location.__proto__ || Object.getPrototypeOf(Location)).apply(this, arguments));
    }

    _createClass(Location, [{
        key: 'toString',


        /**
         * Convert this location to a string.
         * @return {String}
         */
        value: function toString() {}

        /**
         * Convert this immutable instance to an object
         * for "history".
         * @return {Object}
         */

    }, {
        key: 'toNative',
        value: function toNative() {
            return {
                pathname: this.pathname,
                hash: this.hash ? '#' + this.hash : '',
                search: this.search
            };
        }

        /**
         * Convert an instance from "history" to Location.
         * @param {Object|String} location
         * @return {Location}
         */

    }, {
        key: 'search',


        /**
         * Return search query as a string
         * @return {String}
         */
        get: function get() {
            var query = this.query;

            return query.size === 0 ? '' : '?' + querystring.stringify(query.toJS());
        }
    }], [{
        key: 'fromNative',
        value: function fromNative(location) {
            if (typeof location === 'string') {
                location = { pathname: location };
            }

            var pathname = location.pathname;
            var hash = location.hash || '';
            var search = location.search || '';
            var query = location.query;

            hash = hash[0] === '#' ? hash.slice(1) : hash;
            search = search[0] === '?' ? search.slice(1) : search;

            if (query) {
                query = Map(query);
            } else {
                query = Map(querystring.parse(search));
            }

            return new Location({
                pathname: pathname,
                hash: hash,
                query: query
            });
        }
    }]);

    return Location;
}(Record(DEFAULTS));

module.exports = Location;