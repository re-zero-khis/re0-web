'use strict';

require('whatwg-fetch');

var React = require('react');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var Immutable = require('immutable');
var Head = require('react-helmet');
var Promise = require('bluebird');

var _require = require('react-redux'),
    Provider = _require.Provider;

var _require2 = require('reflexbox'),
    Flex = _require2.Flex,
    Box = _require2.Box;

var _require3 = require('./components/InjectedComponent'),
    InjectedComponent = _require3.InjectedComponent,
    InjectedComponentSet = _require3.InjectedComponentSet;

var _require4 = require('./components/Import'),
    ImportLink = _require4.ImportLink,
    ImportScript = _require4.ImportScript,
    ImportCSS = _require4.ImportCSS;

var HTMLContent = require('./components/HTMLContent');
var Link = require('./components/Link');
var Image = require('./components/Image');
var Icon = require('./components/Icon');
var HotKeys = require('./components/HotKeys');
var Button = require('./components/Button');
var ButtonGroup = require('./components/ButtonGroup');
var Dropdown = require('./components/Dropdown');
var Panel = require('./components/Panel');
var Backdrop = require('./components/Backdrop');
var Tooltipped = require('./components/Tooltipped');
var I18nProvider = require('./components/I18nProvider');

var ACTIONS = require('./actions/TYPES');

var PropTypes = require('./propTypes');
var connect = require('./lib/connect');
var createPlugin = require('./lib/createPlugin');
var createReducer = require('./lib/createReducer');
var createContext = require('./lib/createContext');
var composeReducer = require('./lib/composeReducer');
var bootstrap = require('./lib/bootstrap');
var renderWithContext = require('./lib/renderWithContext');

module.exports = {
    ACTIONS: ACTIONS,
    bootstrap: bootstrap,
    renderWithContext: renderWithContext,
    connect: connect,
    createPlugin: createPlugin,
    createReducer: createReducer,
    createContext: createContext,
    composeReducer: composeReducer,
    // React Components
    I18nProvider: I18nProvider,
    InjectedComponent: InjectedComponent,
    InjectedComponentSet: InjectedComponentSet,
    HTMLContent: HTMLContent,
    Head: Head,
    Panel: Panel,
    Provider: Provider,
    ImportLink: ImportLink,
    ImportScript: ImportScript,
    ImportCSS: ImportCSS,
    FlexLayout: Flex,
    FlexBox: Box,
    Link: Link,
    Image: Image,
    Icon: Icon,
    HotKeys: HotKeys,
    Button: Button,
    ButtonGroup: ButtonGroup,
    Dropdown: Dropdown,
    Backdrop: Backdrop,
    Tooltipped: Tooltipped,
    // Utilities
    PropTypes: PropTypes,
    // Librairies
    React: React,
    ReactCSSTransitionGroup: ReactCSSTransitionGroup,
    Immutable: Immutable,
    Promise: Promise
};