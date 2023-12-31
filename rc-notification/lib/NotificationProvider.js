"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NotificationContext = void 0;
var _react = _interopRequireDefault(require("react"));
var NotificationContext = /*#__PURE__*/_react.default.createContext({});
exports.NotificationContext = NotificationContext;
var NotificationProvider = function NotificationProvider(_ref) {
  var children = _ref.children,
    classNames = _ref.classNames;
  return /*#__PURE__*/_react.default.createElement(NotificationContext.Provider, {
    value: {
      classNames: classNames
    }
  }, children);
};
var _default = NotificationProvider;
exports.default = _default;