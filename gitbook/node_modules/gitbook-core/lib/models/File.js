'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');

var _require = require('immutable'),
    Record = _require.Record;

var DEFAULTS = {
    type: '',
    mtime: new Date(),
    path: '',
    url: ''
};

var File = function (_Record) {
    _inherits(File, _Record);

    function File() {
        var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, File);

        if (typeof file === 'string') {
            file = { path: file, url: file };
        }

        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, _extends({}, file, {
            mtime: new Date(file.mtime)
        })));
    }

    /**
     * @param {String} to Absolute path
     * @return {String} The same path, but relative to this file
     */


    _createClass(File, [{
        key: 'relative',
        value: function relative(to) {
            return path.relative(path.dirname(this.path), to) || './';
        }

        /**
         * Return true if file is an instance of File
         * @param {Mixed} file
         * @return {Boolean} isFile
         */

    }], [{
        key: 'is',
        value: function is(file) {
            return file instanceof File;
        }

        /**
         * Create a file instance
         * @param {Mixed|File} file
         * @return {File} file
         */

    }, {
        key: 'create',
        value: function create(file) {
            return File.is(file) ? file : new File(file);
        }
    }]);

    return File;
}(Record(DEFAULTS));

module.exports = File;