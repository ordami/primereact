"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelectItem = void 0;

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MultiSelectItem =
/*#__PURE__*/
function (_Component) {
  _inherits(MultiSelectItem, _Component);

  function MultiSelectItem() {
    var _this;

    _classCallCheck(this, MultiSelectItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MultiSelectItem).call(this));
    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MultiSelectItem, [{
    key: "onClick",
    value: function onClick(event) {
      if (this.props.onClick) {
        this.props.onClick({
          originalEvent: event,
          option: this.props.option
        });
      }

      event.preventDefault();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.props.onKeyDown) {
        this.props.onKeyDown({
          originalEvent: event,
          option: this.props.option
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = (0, _classnames.default)('p-multiselect-item', {
        'p-highlight': this.props.selected
      });
      var checkboxClassName = (0, _classnames.default)('p-checkbox-box p-component', {
        'p-highlight': this.props.selected
      });
      var checkboxIcon = (0, _classnames.default)('p-checkbox-icon p-c', {
        'pi pi-check': this.props.selected
      });
      var content = this.props.template ? this.props.template(this.props.option) : this.props.label;
      return _react.default.createElement("li", {
        className: className,
        onClick: this.onClick,
        tabIndex: this.props.tabIndex,
        onKeyDown: this.onKeyDown,
        role: "option",
        "aria-selected": this.props.selected
      }, _react.default.createElement("div", {
        className: "p-checkbox p-component"
      }, _react.default.createElement("div", {
        className: checkboxClassName
      }, _react.default.createElement("span", {
        className: checkboxIcon
      }))), _react.default.createElement("label", null, content));
    }
  }]);

  return MultiSelectItem;
}(_react.Component);

exports.MultiSelectItem = MultiSelectItem;

_defineProperty(MultiSelectItem, "defaultProps", {
  option: null,
  label: null,
  selected: false,
  tabIndex: null,
  template: null,
  onClick: null,
  onKeyDown: null
});

_defineProperty(MultiSelectItem, "propTypes", {
  option: _propTypes.default.object,
  label: _propTypes.default.string,
  selected: _propTypes.default.bool,
  tabIndex: _propTypes.default.string,
  template: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func
});