"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Card =
/*#__PURE__*/
function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _getPrototypeOf(Card).apply(this, arguments));
  }

  _createClass(Card, [{
    key: "renderHeader",
    value: function renderHeader() {
      return _react.default.createElement("div", {
        className: "p-card-header"
      }, this.props.header);
    }
  }, {
    key: "renderBody",
    value: function renderBody() {
      var title, subTitle, footer, children;

      if (this.props.title) {
        title = _react.default.createElement("div", {
          className: "p-card-title"
        }, this.props.title);
      }

      if (this.props.subTitle) {
        subTitle = _react.default.createElement("div", {
          className: "p-card-subtitle"
        }, this.props.subTitle);
      }

      if (this.props.footer) {
        footer = _react.default.createElement("div", {
          className: "p-card-footer"
        }, " ", this.props.footer);
      }

      if (this.props.children) {
        children = _react.default.createElement("div", {
          className: "p-card-content"
        }, " ", this.props.children, " ");
      }

      return _react.default.createElement("div", {
        className: "p-card-body"
      }, title, subTitle, children, footer);
    }
  }, {
    key: "render",
    value: function render() {
      var header, body;
      var className = (0, _classnames.default)('p-card p-component', this.props.className);

      if (this.props.header) {
        header = this.renderHeader();
      }

      body = this.renderBody();
      return _react.default.createElement("div", {
        className: className,
        style: this.props.style
      }, header, body);
    }
  }]);

  return Card;
}(_react.Component);

exports.Card = Card;

_defineProperty(Card, "defaultProps", {
  id: null,
  header: null,
  footer: null,
  title: null,
  subTitle: null,
  style: null,
  className: null
});

_defineProperty(Card, "propTypes", {
  id: _propTypes.default.string,
  header: _propTypes.default.any,
  footer: _propTypes.default.any,
  title: _propTypes.default.string,
  subTitle: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string
});