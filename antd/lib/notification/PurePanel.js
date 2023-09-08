"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TypeIcon = exports.PureContent = void 0;
exports.getCloseIcon = getCloseIcon;
var _CheckCircleFilled = _interopRequireDefault(require("@ant-design/icons/CheckCircleFilled"));
var _CloseCircleFilled = _interopRequireDefault(require("@ant-design/icons/CloseCircleFilled"));
var _CloseOutlined = _interopRequireDefault(require("@ant-design/icons/CloseOutlined"));
var _ExclamationCircleFilled = _interopRequireDefault(require("@ant-design/icons/ExclamationCircleFilled"));
var _InfoCircleFilled = _interopRequireDefault(require("@ant-design/icons/InfoCircleFilled"));
var _LoadingOutlined = _interopRequireDefault(require("@ant-design/icons/LoadingOutlined"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcNotification = require("rc-notification");
var React = _interopRequireWildcard(require("react"));
var _configProvider = require("../config-provider");
var _style = _interopRequireDefault(require("./style"));
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TypeIcon = {
  info: /*#__PURE__*/React.createElement(_InfoCircleFilled.default, null),
  success: /*#__PURE__*/React.createElement(_CheckCircleFilled.default, null),
  error: /*#__PURE__*/React.createElement(_CloseCircleFilled.default, null),
  warning: /*#__PURE__*/React.createElement(_ExclamationCircleFilled.default, null),
  loading: /*#__PURE__*/React.createElement(_LoadingOutlined.default, null)
};
exports.TypeIcon = TypeIcon;
function getCloseIcon(prefixCls, closeIcon) {
  if (closeIcon === null || closeIcon === false) {
    return null;
  }
  return closeIcon || /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-close-x`
  }, /*#__PURE__*/React.createElement(_CloseOutlined.default, {
    className: `${prefixCls}-close-icon`
  }));
}
const typeToIcon = {
  success: _CheckCircleFilled.default,
  info: _InfoCircleFilled.default,
  error: _CloseCircleFilled.default,
  warning: _ExclamationCircleFilled.default
};
const PureContent = props => {
  const {
    prefixCls,
    icon,
    type,
    message,
    description,
    btn,
    role = 'alert'
  } = props;
  let iconNode = null;
  if (icon) {
    iconNode = /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-icon`
    }, icon);
  } else if (type) {
    iconNode = /*#__PURE__*/React.createElement(typeToIcon[type] || null, {
      className: (0, _classnames.default)(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`)
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)({
      [`${prefixCls}-with-icon`]: iconNode
    }),
    role: role
  }, iconNode, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-message`
  }, message), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-description`
  }, description), btn && /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-btn`
  }, btn));
};
/** @private Internal Component. Do not use in your production. */
exports.PureContent = PureContent;
const PurePanel = props => {
  const {
      prefixCls: staticPrefixCls,
      className,
      icon,
      type,
      message,
      description,
      btn,
      closable = true,
      closeIcon
    } = props,
    restProps = __rest(props, ["prefixCls", "className", "icon", "type", "message", "description", "btn", "closable", "closeIcon"]);
  const {
    getPrefixCls
  } = React.useContext(_configProvider.ConfigContext);
  const prefixCls = staticPrefixCls || getPrefixCls('notification');
  const noticePrefixCls = `${prefixCls}-notice`;
  const [, hashId] = (0, _style.default)(prefixCls);
  return /*#__PURE__*/React.createElement(_rcNotification.Notice, Object.assign({}, restProps, {
    prefixCls: prefixCls,
    className: (0, _classnames.default)(className, hashId, `${noticePrefixCls}-pure-panel`),
    eventKey: "pure",
    duration: null,
    closable: closable,
    closeIcon: getCloseIcon(prefixCls, closeIcon),
    content: /*#__PURE__*/React.createElement(PureContent, {
      prefixCls: noticePrefixCls,
      icon: icon,
      type: type,
      message: message,
      description: description,
      btn: btn
    })
  }));
};
var _default = PurePanel;
exports.default = _default;