'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('immutable'),
    Record = _require.Record,
    List = _require.List;

var DEFAULTS = {
    title: '',
    depth: 0,
    path: '',
    url: '',
    ref: '',
    level: '',
    articles: List()
};

var SummaryArticle = function (_Record) {
    _inherits(SummaryArticle, _Record);

    function SummaryArticle(article) {
        _classCallCheck(this, SummaryArticle);

        return _possibleConstructorReturn(this, (SummaryArticle.__proto__ || Object.getPrototypeOf(SummaryArticle)).call(this, _extends({}, article, {
            articles: new List(article.articles).map(function (art) {
                return new SummaryArticle(art);
            })
        })));
    }

    /**
     * Return true if article is an instance of SummaryArticle
     * @param {Mixed} article
     * @return {Boolean}
     */


    _createClass(SummaryArticle, null, [{
        key: 'is',
        value: function is(article) {
            return article instanceof SummaryArticle;
        }
    }]);

    return SummaryArticle;
}(Record(DEFAULTS));

module.exports = SummaryArticle;