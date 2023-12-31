"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Keyframes", {
  enumerable: true,
  get: function get() {
    return _Keyframes.default;
  }
});
Object.defineProperty(exports, "StyleProvider", {
  enumerable: true,
  get: function get() {
    return _StyleContext.StyleProvider;
  }
});
Object.defineProperty(exports, "Theme", {
  enumerable: true,
  get: function get() {
    return _theme.Theme;
  }
});
exports._experimental = void 0;
Object.defineProperty(exports, "createCache", {
  enumerable: true,
  get: function get() {
    return _StyleContext.createCache;
  }
});
Object.defineProperty(exports, "createTheme", {
  enumerable: true,
  get: function get() {
    return _theme.createTheme;
  }
});
Object.defineProperty(exports, "extractStyle", {
  enumerable: true,
  get: function get() {
    return _useStyleRegister.extractStyle;
  }
});
Object.defineProperty(exports, "getComputedToken", {
  enumerable: true,
  get: function get() {
    return _useCacheToken.getComputedToken;
  }
});
Object.defineProperty(exports, "legacyLogicalPropertiesTransformer", {
  enumerable: true,
  get: function get() {
    return _legacyLogicalProperties.default;
  }
});
Object.defineProperty(exports, "legacyNotSelectorLinter", {
  enumerable: true,
  get: function get() {
    return _linters.legacyNotSelectorLinter;
  }
});
Object.defineProperty(exports, "logicalPropertiesLinter", {
  enumerable: true,
  get: function get() {
    return _linters.logicalPropertiesLinter;
  }
});
Object.defineProperty(exports, "parentSelectorLinter", {
  enumerable: true,
  get: function get() {
    return _linters.parentSelectorLinter;
  }
});
Object.defineProperty(exports, "px2remTransformer", {
  enumerable: true,
  get: function get() {
    return _px2rem.default;
  }
});
Object.defineProperty(exports, "useCacheToken", {
  enumerable: true,
  get: function get() {
    return _useCacheToken.default;
  }
});
Object.defineProperty(exports, "useStyleRegister", {
  enumerable: true,
  get: function get() {
    return _useStyleRegister.default;
  }
});
var _useCacheToken = _interopRequireWildcard(require("./hooks/useCacheToken"));
var _useStyleRegister = _interopRequireWildcard(require("./hooks/useStyleRegister"));
var _Keyframes = _interopRequireDefault(require("./Keyframes"));
var _linters = require("./linters");
var _StyleContext = require("./StyleContext");
var _theme = require("./theme");
var _legacyLogicalProperties = _interopRequireDefault(require("./transformers/legacyLogicalProperties"));
var _px2rem = _interopRequireDefault(require("./transformers/px2rem"));
var _util = require("./util");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _experimental = {
  supportModernCSS: function supportModernCSS() {
    return (0, _util.supportWhere)() && (0, _util.supportLogicProps)();
  }
};
exports._experimental = _experimental;