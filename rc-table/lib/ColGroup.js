"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _legacyUtil = require("./utils/legacyUtil");
var _excluded = ["columnType"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ColGroup(_ref) {
  var colWidths = _ref.colWidths,
    columns = _ref.columns,
    columCount = _ref.columCount;
  var cols = [];
  var len = columCount || columns.length;

  // Only insert col with width & additional props
  // Skip if rest col do not have any useful info
  var mustInsert = false;
  for (var i = len - 1; i >= 0; i -= 1) {
    var width = colWidths[i];
    var column = columns && columns[i];
    var additionalProps = column && column[_legacyUtil.INTERNAL_COL_DEFINE];
    if (width || additionalProps || mustInsert) {
      var _ref2 = additionalProps || {},
        columnType = _ref2.columnType,
        restAdditionalProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
      cols.unshift( /*#__PURE__*/React.createElement("col", (0, _extends2.default)({
        key: i,
        style: {
          width: width
        }
      }, restAdditionalProps)));
      mustInsert = true;
    }
  }
  return /*#__PURE__*/React.createElement("colgroup", null, cols);
}
var _default = ColGroup;
exports.default = _default;