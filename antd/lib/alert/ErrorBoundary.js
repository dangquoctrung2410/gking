"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));
var React = _interopRequireWildcard(require("react"));
var _Alert = _interopRequireDefault(require("./Alert"));
let ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ErrorBoundary, _React$Component);
  var _super = (0, _createSuper2.default)(ErrorBoundary);
  function ErrorBoundary() {
    var _this;
    (0, _classCallCheck2.default)(this, ErrorBoundary);
    _this = _super.apply(this, arguments);
    _this.state = {
      error: undefined,
      info: {
        componentStack: ''
      }
    };
    return _this;
  }
  (0, _createClass2.default)(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      this.setState({
        error,
        info
      });
    }
  }, {
    key: "render",
    value: function render() {
      const {
        message,
        description,
        children
      } = this.props;
      const {
        error,
        info
      } = this.state;
      const componentStack = info && info.componentStack ? info.componentStack : null;
      const errorMessage = typeof message === 'undefined' ? (error || '').toString() : message;
      const errorDescription = typeof description === 'undefined' ? componentStack : description;
      if (error) {
        return /*#__PURE__*/React.createElement(_Alert.default, {
          type: "error",
          message: errorMessage,
          description: /*#__PURE__*/React.createElement("pre", {
            style: {
              fontSize: '0.9em',
              overflowX: 'auto'
            }
          }, errorDescription)
        });
      }
      return children;
    }
  }]);
  return ErrorBoundary;
}(React.Component);
var _default = ErrorBoundary;
exports.default = _default;