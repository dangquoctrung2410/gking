"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _context = require("@rc-component/context");
var _classnames = _interopRequireDefault(require("classnames"));
var _ref2 = require("rc-util/lib/ref");
var React = _interopRequireWildcard(require("react"));
var _ColGroup = _interopRequireDefault(require("../ColGroup"));
var _TableContext = _interopRequireDefault(require("../context/TableContext"));
var _useRenderTimes = _interopRequireDefault(require("../hooks/useRenderTimes"));
var _excluded = ["className", "noData", "columns", "flattenColumns", "colWidths", "columCount", "stickyOffsets", "direction", "fixHeader", "stickyTopOffset", "stickyBottomOffset", "stickyClassName", "onScroll", "maxContentScroll", "children"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useColumnWidth(colWidths, columCount) {
  return (0, React.useMemo)(function () {
    var cloneColumns = [];
    for (var i = 0; i < columCount; i += 1) {
      var val = colWidths[i];
      if (val !== undefined) {
        cloneColumns[i] = val;
      } else {
        return null;
      }
    }
    return cloneColumns;
  }, [colWidths.join('_'), columCount]);
}
var FixedHolder = /*#__PURE__*/React.forwardRef(function (props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    (0, _useRenderTimes.default)(props);
  }
  var className = props.className,
    noData = props.noData,
    columns = props.columns,
    flattenColumns = props.flattenColumns,
    colWidths = props.colWidths,
    columCount = props.columCount,
    stickyOffsets = props.stickyOffsets,
    direction = props.direction,
    fixHeader = props.fixHeader,
    stickyTopOffset = props.stickyTopOffset,
    stickyBottomOffset = props.stickyBottomOffset,
    stickyClassName = props.stickyClassName,
    onScroll = props.onScroll,
    maxContentScroll = props.maxContentScroll,
    children = props.children,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var _useContext = (0, _context.useContext)(_TableContext.default, ['prefixCls', 'scrollbarSize', 'isSticky']),
    prefixCls = _useContext.prefixCls,
    scrollbarSize = _useContext.scrollbarSize,
    isSticky = _useContext.isSticky;
  var combinationScrollBarSize = isSticky && !fixHeader ? 0 : scrollbarSize;

  // Pass wheel to scroll event
  var scrollRef = React.useRef(null);
  var setScrollRef = React.useCallback(function (element) {
    (0, _ref2.fillRef)(ref, element);
    (0, _ref2.fillRef)(scrollRef, element);
  }, []);
  React.useEffect(function () {
    var _scrollRef$current;
    function onWheel(e) {
      var _ref = e,
        currentTarget = _ref.currentTarget,
        deltaX = _ref.deltaX;
      if (deltaX) {
        onScroll({
          currentTarget: currentTarget,
          scrollLeft: currentTarget.scrollLeft + deltaX
        });
        e.preventDefault();
      }
    }
    (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.addEventListener('wheel', onWheel);
    return function () {
      var _scrollRef$current2;
      (_scrollRef$current2 = scrollRef.current) === null || _scrollRef$current2 === void 0 ? void 0 : _scrollRef$current2.removeEventListener('wheel', onWheel);
    };
  }, []);

  // Check if all flattenColumns has width
  var allFlattenColumnsWithWidth = React.useMemo(function () {
    return flattenColumns.every(function (column) {
      return column.width >= 0;
    });
  }, [flattenColumns]);

  // Add scrollbar column
  var lastColumn = flattenColumns[flattenColumns.length - 1];
  var ScrollBarColumn = {
    fixed: lastColumn ? lastColumn.fixed : null,
    scrollbar: true,
    onHeaderCell: function onHeaderCell() {
      return {
        className: "".concat(prefixCls, "-cell-scrollbar")
      };
    }
  };
  var columnsWithScrollbar = (0, React.useMemo)(function () {
    return combinationScrollBarSize ? [].concat((0, _toConsumableArray2.default)(columns), [ScrollBarColumn]) : columns;
  }, [combinationScrollBarSize, columns]);
  var flattenColumnsWithScrollbar = (0, React.useMemo)(function () {
    return combinationScrollBarSize ? [].concat((0, _toConsumableArray2.default)(flattenColumns), [ScrollBarColumn]) : flattenColumns;
  }, [combinationScrollBarSize, flattenColumns]);

  // Calculate the sticky offsets
  var headerStickyOffsets = (0, React.useMemo)(function () {
    var right = stickyOffsets.right,
      left = stickyOffsets.left;
    return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, stickyOffsets), {}, {
      left: direction === 'rtl' ? [].concat((0, _toConsumableArray2.default)(left.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]) : left,
      right: direction === 'rtl' ? right : [].concat((0, _toConsumableArray2.default)(right.map(function (width) {
        return width + combinationScrollBarSize;
      })), [0]),
      isSticky: isSticky
    });
  }, [combinationScrollBarSize, stickyOffsets, isSticky]);
  var mergedColumnWidth = useColumnWidth(colWidths, columCount);
  return /*#__PURE__*/React.createElement("div", {
    style: (0, _objectSpread2.default)({
      overflow: 'hidden'
    }, isSticky ? {
      top: stickyTopOffset,
      bottom: stickyBottomOffset
    } : {}),
    ref: setScrollRef,
    className: (0, _classnames.default)(className, (0, _defineProperty2.default)({}, stickyClassName, !!stickyClassName))
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      tableLayout: 'fixed',
      visibility: noData || mergedColumnWidth ? null : 'hidden'
    }
  }, (!noData || !maxContentScroll || allFlattenColumnsWithWidth) && /*#__PURE__*/React.createElement(_ColGroup.default, {
    colWidths: mergedColumnWidth ? [].concat((0, _toConsumableArray2.default)(mergedColumnWidth), [combinationScrollBarSize]) : [],
    columCount: columCount + 1,
    columns: flattenColumnsWithScrollbar
  }), children((0, _objectSpread2.default)((0, _objectSpread2.default)({}, restProps), {}, {
    stickyOffsets: headerStickyOffsets,
    columns: columnsWithScrollbar,
    flattenColumns: flattenColumnsWithScrollbar
  }))));
});
FixedHolder.displayName = 'FixedHolder';

/** Return a table in div as fixed element which contains sticky info */
// export default responseImmutable(FixedHolder);
var _default = /*#__PURE__*/React.memo(FixedHolder);
exports.default = _default;