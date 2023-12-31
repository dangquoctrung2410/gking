"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.genTable = genTable;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _context = require("@rc-component/context");
var _classnames = _interopRequireDefault(require("classnames"));
var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));
var _isVisible = _interopRequireDefault(require("rc-util/lib/Dom/isVisible"));
var _styleChecker = require("rc-util/lib/Dom/styleChecker");
var _getScrollBarSize = require("rc-util/lib/getScrollBarSize");
var _useEvent = _interopRequireDefault(require("rc-util/lib/hooks/useEvent"));
var _pickAttrs = _interopRequireDefault(require("rc-util/lib/pickAttrs"));
var _get = _interopRequireDefault(require("rc-util/lib/utils/get"));
var _warning = _interopRequireDefault(require("rc-util/lib/warning"));
var React = _interopRequireWildcard(require("react"));
var _Body = _interopRequireDefault(require("./Body"));
var _ColGroup = _interopRequireDefault(require("./ColGroup"));
var _constant = require("./constant");
var _TableContext = _interopRequireDefault(require("./context/TableContext"));
var _FixedHolder = _interopRequireDefault(require("./FixedHolder"));
var _Footer = _interopRequireWildcard(require("./Footer"));
var _Summary = _interopRequireDefault(require("./Footer/Summary"));
var _Header = _interopRequireDefault(require("./Header/Header"));
var _useColumns3 = _interopRequireDefault(require("./hooks/useColumns"));
var _useExpand3 = _interopRequireDefault(require("./hooks/useExpand"));
var _useFixedInfo = _interopRequireDefault(require("./hooks/useFixedInfo"));
var _useFrame = require("./hooks/useFrame");
var _useHover3 = _interopRequireDefault(require("./hooks/useHover"));
var _useSticky2 = _interopRequireDefault(require("./hooks/useSticky"));
var _useStickyOffsets = _interopRequireDefault(require("./hooks/useStickyOffsets"));
var _Panel = _interopRequireDefault(require("./Panel"));
var _stickyScrollBar = _interopRequireDefault(require("./stickyScrollBar"));
var _Column = _interopRequireDefault(require("./sugar/Column"));
var _ColumnGroup = _interopRequireDefault(require("./sugar/ColumnGroup"));
var _valueUtil = require("./utils/valueUtil");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Feature:
 *  - fixed not need to set width
 *  - support `rowExpandable` to config row expand logic
 *  - add `summary` to support `() => ReactNode`
 *
 * Update:
 *  - `dataIndex` is `array[]` now
 *  - `expandable` wrap all the expand related props
 *
 * Removed:
 *  - expandIconAsCell
 *  - useFixedHeader
 *  - rowRef
 *  - columns[number].onCellClick
 *  - onRowClick
 *  - onRowDoubleClick
 *  - onRowMouseEnter
 *  - onRowMouseLeave
 *  - getBodyWrapper
 *  - bodyStyle
 *
 * Deprecated:
 *  - All expanded props, move into expandable
 */

// Used for conditions cache
var EMPTY_DATA = [];

// Used for customize scroll
var EMPTY_SCROLL_TARGET = {};
function defaultEmpty() {
  return 'No Data';
}
function Table(tableProps) {
  var _classNames;
  var props = (0, _objectSpread2.default)({
    rowKey: 'key',
    prefixCls: 'rc-table',
    emptyText: defaultEmpty
  }, tableProps);
  var prefixCls = props.prefixCls,
    className = props.className,
    rowClassName = props.rowClassName,
    style = props.style,
    data = props.data,
    rowKey = props.rowKey,
    scroll = props.scroll,
    tableLayout = props.tableLayout,
    direction = props.direction,
    title = props.title,
    footer = props.footer,
    summary = props.summary,
    caption = props.caption,
    id = props.id,
    showHeader = props.showHeader,
    components = props.components,
    emptyText = props.emptyText,
    onRow = props.onRow,
    onHeaderRow = props.onHeaderRow,
    internalHooks = props.internalHooks,
    transformColumns = props.transformColumns,
    internalRefs = props.internalRefs,
    sticky = props.sticky;
  var mergedData = data || EMPTY_DATA;
  var hasData = !!mergedData.length;

  // ===================== Warning ======================
  if (process.env.NODE_ENV !== 'production') {
    ['onRowClick', 'onRowDoubleClick', 'onRowContextMenu', 'onRowMouseEnter', 'onRowMouseLeave'].forEach(function (name) {
      (0, _warning.default)(props[name] === undefined, "`".concat(name, "` is removed, please use `onRow` instead."));
    });
    (0, _warning.default)(!('getBodyWrapper' in props), '`getBodyWrapper` is deprecated, please use custom `components` instead.');
  }

  // ==================== Customize =====================
  var getComponent = React.useCallback(function (path, defaultComponent) {
    return (0, _get.default)(components, path) || defaultComponent;
  }, [components]);
  var getRowKey = React.useMemo(function () {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return function (record) {
      var key = record && record[rowKey];
      if (process.env.NODE_ENV !== 'production') {
        (0, _warning.default)(key !== undefined, 'Each record in table should have a unique `key` prop, or set `rowKey` to an unique primary key.');
      }
      return key;
    };
  }, [rowKey]);

  // ====================== Hover =======================
  var _useHover = (0, _useHover3.default)(),
    _useHover2 = (0, _slicedToArray2.default)(_useHover, 3),
    startRow = _useHover2[0],
    endRow = _useHover2[1],
    onHover = _useHover2[2];

  // ====================== Expand ======================
  var _useExpand = (0, _useExpand3.default)(props, mergedData, getRowKey),
    _useExpand2 = (0, _slicedToArray2.default)(_useExpand, 6),
    expandableConfig = _useExpand2[0],
    expandableType = _useExpand2[1],
    mergedExpandedKeys = _useExpand2[2],
    mergedExpandIcon = _useExpand2[3],
    mergedChildrenColumnName = _useExpand2[4],
    onTriggerExpand = _useExpand2[5];

  // ====================== Column ======================
  var _React$useState = React.useState(0),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    componentWidth = _React$useState2[0],
    setComponentWidth = _React$useState2[1];
  var _useColumns = (0, _useColumns3.default)((0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), expandableConfig), {}, {
      expandable: !!expandableConfig.expandedRowRender,
      columnTitle: expandableConfig.columnTitle,
      expandedKeys: mergedExpandedKeys,
      getRowKey: getRowKey,
      // https://github.com/ant-design/ant-design/issues/23894
      onTriggerExpand: onTriggerExpand,
      expandIcon: mergedExpandIcon,
      expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
      direction: direction
    }), internalHooks === _constant.INTERNAL_HOOKS ? transformColumns : null),
    _useColumns2 = (0, _slicedToArray2.default)(_useColumns, 2),
    columns = _useColumns2[0],
    flattenColumns = _useColumns2[1];
  var columnContext = React.useMemo(function () {
    return {
      columns: columns,
      flattenColumns: flattenColumns
    };
  }, [columns, flattenColumns]);

  // ====================== Scroll ======================
  var fullTableRef = React.useRef();
  var scrollHeaderRef = React.useRef();
  var scrollBodyRef = React.useRef();
  var scrollBodyContainerRef = React.useRef();
  var scrollSummaryRef = React.useRef();
  var _React$useState3 = React.useState(false),
    _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
    pingedLeft = _React$useState4[0],
    setPingedLeft = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
    pingedRight = _React$useState6[0],
    setPingedRight = _React$useState6[1];
  var _useLayoutState = (0, _useFrame.useLayoutState)(new Map()),
    _useLayoutState2 = (0, _slicedToArray2.default)(_useLayoutState, 2),
    colsWidths = _useLayoutState2[0],
    updateColsWidths = _useLayoutState2[1];

  // Convert map to number width
  var colsKeys = (0, _valueUtil.getColumnsKey)(flattenColumns);
  var pureColWidths = colsKeys.map(function (columnKey) {
    return colsWidths.get(columnKey);
  });
  var colWidths = React.useMemo(function () {
    return pureColWidths;
  }, [pureColWidths.join('_')]);
  var stickyOffsets = (0, _useStickyOffsets.default)(colWidths, flattenColumns.length, direction);
  var fixHeader = scroll && (0, _valueUtil.validateValue)(scroll.y);
  var horizonScroll = scroll && (0, _valueUtil.validateValue)(scroll.x) || Boolean(expandableConfig.fixed);
  var fixColumn = horizonScroll && flattenColumns.some(function (_ref) {
    var fixed = _ref.fixed;
    return fixed;
  });

  // Sticky
  var stickyRef = React.useRef();
  var _useSticky = (0, _useSticky2.default)(sticky, prefixCls),
    isSticky = _useSticky.isSticky,
    offsetHeader = _useSticky.offsetHeader,
    offsetSummary = _useSticky.offsetSummary,
    offsetScroll = _useSticky.offsetScroll,
    stickyClassName = _useSticky.stickyClassName,
    container = _useSticky.container;

  // Footer (Fix footer must fixed header)
  var summaryNode = React.useMemo(function () {
    return summary === null || summary === void 0 ? void 0 : summary(mergedData);
  }, [summary, mergedData]);
  var fixFooter = (fixHeader || isSticky) && /*#__PURE__*/React.isValidElement(summaryNode) && summaryNode.type === _Summary.default && summaryNode.props.fixed;

  // Scroll
  var scrollXStyle;
  var scrollYStyle;
  var scrollTableStyle;
  if (fixHeader) {
    scrollYStyle = {
      overflowY: 'scroll',
      maxHeight: scroll.y
    };
  }
  if (horizonScroll) {
    scrollXStyle = {
      overflowX: 'auto'
    };
    // When no vertical scrollbar, should hide it
    // https://github.com/ant-design/ant-design/pull/20705
    // https://github.com/ant-design/ant-design/issues/21879
    if (!fixHeader) {
      scrollYStyle = {
        overflowY: 'hidden'
      };
    }
    scrollTableStyle = {
      width: (scroll === null || scroll === void 0 ? void 0 : scroll.x) === true ? 'auto' : scroll === null || scroll === void 0 ? void 0 : scroll.x,
      minWidth: '100%'
    };
  }
  var onColumnResize = React.useCallback(function (columnKey, width) {
    if ((0, _isVisible.default)(fullTableRef.current)) {
      updateColsWidths(function (widths) {
        if (widths.get(columnKey) !== width) {
          var newWidths = new Map(widths);
          newWidths.set(columnKey, width);
          return newWidths;
        }
        return widths;
      });
    }
  }, []);
  var _useTimeoutLock = (0, _useFrame.useTimeoutLock)(null),
    _useTimeoutLock2 = (0, _slicedToArray2.default)(_useTimeoutLock, 2),
    setScrollTarget = _useTimeoutLock2[0],
    getScrollTarget = _useTimeoutLock2[1];
  function forceScroll(scrollLeft, target) {
    if (!target) {
      return;
    }
    if (typeof target === 'function') {
      target(scrollLeft);
    } else if (target.scrollLeft !== scrollLeft) {
      target.scrollLeft = scrollLeft;

      // Delay to force scroll position if not sync
      // ref: https://github.com/ant-design/ant-design/issues/37179
      if (target.scrollLeft !== scrollLeft) {
        setTimeout(function () {
          target.scrollLeft = scrollLeft;
        }, 0);
      }
    }
  }
  var onScroll = (0, _useEvent.default)(function (_ref2) {
    var currentTarget = _ref2.currentTarget,
      scrollLeft = _ref2.scrollLeft;
    var isRTL = direction === 'rtl';
    var mergedScrollLeft = typeof scrollLeft === 'number' ? scrollLeft : currentTarget.scrollLeft;
    var compareTarget = currentTarget || EMPTY_SCROLL_TARGET;
    if (!getScrollTarget() || getScrollTarget() === compareTarget) {
      var _stickyRef$current;
      setScrollTarget(compareTarget);
      forceScroll(mergedScrollLeft, scrollHeaderRef.current);
      forceScroll(mergedScrollLeft, scrollBodyRef.current);
      forceScroll(mergedScrollLeft, scrollSummaryRef.current);
      forceScroll(mergedScrollLeft, (_stickyRef$current = stickyRef.current) === null || _stickyRef$current === void 0 ? void 0 : _stickyRef$current.setScrollLeft);
    }
    if (currentTarget) {
      var scrollWidth = currentTarget.scrollWidth,
        clientWidth = currentTarget.clientWidth;
      // There is no space to scroll
      if (scrollWidth === clientWidth) {
        setPingedLeft(false);
        setPingedRight(false);
        return;
      }
      if (isRTL) {
        setPingedLeft(-mergedScrollLeft < scrollWidth - clientWidth);
        setPingedRight(-mergedScrollLeft > 0);
      } else {
        setPingedLeft(mergedScrollLeft > 0);
        setPingedRight(mergedScrollLeft < scrollWidth - clientWidth);
      }
    }
  });
  var triggerOnScroll = function triggerOnScroll() {
    if (horizonScroll && scrollBodyRef.current) {
      onScroll({
        currentTarget: scrollBodyRef.current
      });
    } else {
      setPingedLeft(false);
      setPingedRight(false);
    }
  };
  var onFullTableResize = function onFullTableResize(_ref3) {
    var width = _ref3.width;
    if (width !== componentWidth) {
      triggerOnScroll();
      setComponentWidth(fullTableRef.current ? fullTableRef.current.offsetWidth : width);
    }
  };

  // Sync scroll bar when init or `horizonScroll`, `data` and `columns.length` changed
  var mounted = React.useRef(false);
  React.useEffect(function () {
    // onFullTableResize will be trigger once when ResizeObserver is mounted
    // This will reduce one duplicated triggerOnScroll time
    if (mounted.current) {
      triggerOnScroll();
    }
  }, [horizonScroll, data, columns.length]);
  React.useEffect(function () {
    mounted.current = true;
  }, []);

  // ===================== Effects ======================
  var _React$useState7 = React.useState(0),
    _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
    scrollbarSize = _React$useState8[0],
    setScrollbarSize = _React$useState8[1];
  var _React$useState9 = React.useState(true),
    _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
    supportSticky = _React$useState10[0],
    setSupportSticky = _React$useState10[1]; // Only IE not support, we mark as support first

  React.useEffect(function () {
    if (scrollBodyRef.current instanceof Element) {
      setScrollbarSize((0, _getScrollBarSize.getTargetScrollBarSize)(scrollBodyRef.current).width);
    } else {
      setScrollbarSize((0, _getScrollBarSize.getTargetScrollBarSize)(scrollBodyContainerRef.current).width);
    }
    setSupportSticky((0, _styleChecker.isStyleSupport)('position', 'sticky'));
  }, []);

  // ================== INTERNAL HOOKS ==================
  React.useEffect(function () {
    if (internalHooks === _constant.INTERNAL_HOOKS && internalRefs) {
      internalRefs.body.current = scrollBodyRef.current;
    }
  });

  // ========================================================================
  // ==                               Render                               ==
  // ========================================================================
  // =================== Render: Func ===================
  var renderFixedHeaderTable = React.useCallback(function (fixedHolderPassProps) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_Header.default, fixedHolderPassProps), fixFooter === 'top' && /*#__PURE__*/React.createElement(_Footer.default, fixedHolderPassProps, summaryNode));
  }, [fixFooter, summaryNode]);
  var renderFixedFooterTable = React.useCallback(function (fixedHolderPassProps) {
    return /*#__PURE__*/React.createElement(_Footer.default, fixedHolderPassProps, summaryNode);
  }, [summaryNode]);

  // =================== Render: Node ===================
  var TableComponent = getComponent(['table'], 'table');

  // Table layout
  var mergedTableLayout = React.useMemo(function () {
    if (tableLayout) {
      return tableLayout;
    }
    // https://github.com/ant-design/ant-design/issues/25227
    // When scroll.x is max-content, no need to fix table layout
    // it's width should stretch out to fit content
    if (fixColumn) {
      return (scroll === null || scroll === void 0 ? void 0 : scroll.x) === 'max-content' ? 'auto' : 'fixed';
    }
    if (fixHeader || isSticky || flattenColumns.some(function (_ref4) {
      var ellipsis = _ref4.ellipsis;
      return ellipsis;
    })) {
      return 'fixed';
    }
    return 'auto';
  }, [fixHeader, fixColumn, flattenColumns, tableLayout, isSticky]);
  var groupTableNode;

  // Header props
  var headerProps = {
    colWidths: colWidths,
    columCount: flattenColumns.length,
    stickyOffsets: stickyOffsets,
    onHeaderRow: onHeaderRow,
    fixHeader: fixHeader,
    scroll: scroll
  };

  // Empty
  var emptyNode = React.useMemo(function () {
    if (hasData) {
      return null;
    }
    if (typeof emptyText === 'function') {
      return emptyText();
    }
    return emptyText;
  }, [hasData, emptyText]);

  // Body
  var bodyTable = /*#__PURE__*/React.createElement(_Body.default, {
    data: mergedData,
    measureColumnWidth: fixHeader || horizonScroll || isSticky,
    expandedKeys: mergedExpandedKeys,
    rowExpandable: expandableConfig.rowExpandable,
    getRowKey: getRowKey,
    onRow: onRow,
    emptyNode: emptyNode,
    childrenColumnName: mergedChildrenColumnName
  });
  var bodyColGroup = /*#__PURE__*/React.createElement(_ColGroup.default, {
    colWidths: flattenColumns.map(function (_ref5) {
      var width = _ref5.width;
      return width;
    }),
    columns: flattenColumns
  });
  var captionElement = caption !== null && caption !== undefined ? /*#__PURE__*/React.createElement("caption", {
    className: "".concat(prefixCls, "-caption")
  }, caption) : undefined;
  var customizeScrollBody = getComponent(['body']);
  if (process.env.NODE_ENV !== 'production' && typeof customizeScrollBody === 'function' && hasData && !fixHeader) {
    (0, _warning.default)(false, '`components.body` with render props is only work on `scroll.y`.');
  }
  var dataProps = (0, _pickAttrs.default)(props, {
    data: true
  });
  var ariaProps = (0, _pickAttrs.default)(props, {
    aria: true
  });
  if (fixHeader || isSticky) {
    // >>>>>> Fixed Header
    var bodyContent;
    if (typeof customizeScrollBody === 'function') {
      bodyContent = customizeScrollBody(mergedData, {
        scrollbarSize: scrollbarSize,
        ref: scrollBodyRef,
        onScroll: onScroll
      });
      headerProps.colWidths = flattenColumns.map(function (_ref6, index) {
        var width = _ref6.width;
        var colWidth = index === flattenColumns.length - 1 ? width - scrollbarSize : width;
        if (typeof colWidth === 'number' && !Number.isNaN(colWidth)) {
          return colWidth;
        }
        if (process.env.NODE_ENV !== 'production') {
          (0, _warning.default)(props.columns.length === 0, 'When use `components.body` with render props. Each column should have a fixed `width` value.');
        }
        return 0;
      });
    } else {
      bodyContent = /*#__PURE__*/React.createElement("div", {
        style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, scrollXStyle), scrollYStyle),
        onScroll: onScroll,
        ref: scrollBodyRef,
        className: (0, _classnames.default)("".concat(prefixCls, "-body"))
      }, /*#__PURE__*/React.createElement(TableComponent, (0, _extends2.default)({
        style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, scrollTableStyle), {}, {
          tableLayout: mergedTableLayout
        })
      }, ariaProps), captionElement, bodyColGroup, bodyTable, !fixFooter && summaryNode && /*#__PURE__*/React.createElement(_Footer.default, {
        stickyOffsets: stickyOffsets,
        flattenColumns: flattenColumns,
        columns: columns
      }, summaryNode)));
    }

    // Fixed holder share the props
    var fixedHolderProps = (0, _objectSpread2.default)((0, _objectSpread2.default)((0, _objectSpread2.default)({
      noData: !mergedData.length,
      maxContentScroll: horizonScroll && scroll.x === 'max-content'
    }, headerProps), columnContext), {}, {
      direction: direction,
      stickyClassName: stickyClassName,
      onScroll: onScroll
    });
    groupTableNode = /*#__PURE__*/React.createElement(React.Fragment, null, showHeader !== false && /*#__PURE__*/React.createElement(_FixedHolder.default, (0, _extends2.default)({}, fixedHolderProps, {
      stickyTopOffset: offsetHeader,
      className: "".concat(prefixCls, "-header"),
      ref: scrollHeaderRef
    }), renderFixedHeaderTable), bodyContent, fixFooter && fixFooter !== 'top' && /*#__PURE__*/React.createElement(_FixedHolder.default, (0, _extends2.default)({}, fixedHolderProps, {
      stickyBottomOffset: offsetSummary,
      className: "".concat(prefixCls, "-summary"),
      ref: scrollSummaryRef
    }), renderFixedFooterTable), isSticky && /*#__PURE__*/React.createElement(_stickyScrollBar.default, {
      ref: stickyRef,
      offsetScroll: offsetScroll,
      scrollBodyRef: scrollBodyRef,
      onScroll: onScroll,
      container: container
    }));
  } else {
    // >>>>>> Unique table
    groupTableNode = /*#__PURE__*/React.createElement("div", {
      style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, scrollXStyle), scrollYStyle),
      className: (0, _classnames.default)("".concat(prefixCls, "-content")),
      onScroll: onScroll,
      ref: scrollBodyRef
    }, /*#__PURE__*/React.createElement(TableComponent, (0, _extends2.default)({
      style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, scrollTableStyle), {}, {
        tableLayout: mergedTableLayout
      })
    }, ariaProps), captionElement, bodyColGroup, showHeader !== false && /*#__PURE__*/React.createElement(_Header.default, (0, _extends2.default)({}, headerProps, columnContext)), bodyTable, summaryNode && /*#__PURE__*/React.createElement(_Footer.default, {
      stickyOffsets: stickyOffsets,
      flattenColumns: flattenColumns,
      columns: columns
    }, summaryNode)));
  }
  var fullTable = /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _classnames.default)(prefixCls, className, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-ping-left"), pingedLeft), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-ping-right"), pingedRight), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-layout-fixed"), tableLayout === 'fixed'), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-fixed-header"), fixHeader), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-fixed-column"), fixColumn), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-scroll-horizontal"), horizonScroll), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-has-fix-left"), flattenColumns[0] && flattenColumns[0].fixed), (0, _defineProperty2.default)(_classNames, "".concat(prefixCls, "-has-fix-right"), flattenColumns[flattenColumns.length - 1] && flattenColumns[flattenColumns.length - 1].fixed === 'right'), _classNames)),
    style: style,
    id: id,
    ref: fullTableRef
  }, dataProps), title && /*#__PURE__*/React.createElement(_Panel.default, {
    className: "".concat(prefixCls, "-title")
  }, title(mergedData)), /*#__PURE__*/React.createElement("div", {
    ref: scrollBodyContainerRef,
    className: "".concat(prefixCls, "-container")
  }, groupTableNode), footer && /*#__PURE__*/React.createElement(_Panel.default, {
    className: "".concat(prefixCls, "-footer")
  }, footer(mergedData)));
  if (horizonScroll) {
    fullTable = /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
      onResize: onFullTableResize
    }, fullTable);
  }
  var fixedInfoList = (0, _useFixedInfo.default)(flattenColumns, stickyOffsets, direction, columns);
  var TableContextValue = React.useMemo(function () {
    return {
      // Table
      prefixCls: prefixCls,
      getComponent: getComponent,
      scrollbarSize: scrollbarSize,
      direction: direction,
      fixedInfoList: fixedInfoList,
      isSticky: isSticky,
      supportSticky: supportSticky,
      componentWidth: componentWidth,
      fixHeader: fixHeader,
      fixColumn: fixColumn,
      horizonScroll: horizonScroll,
      // Body

      tableLayout: mergedTableLayout,
      rowClassName: rowClassName,
      expandedRowClassName: expandableConfig.expandedRowClassName,
      expandIcon: mergedExpandIcon,
      expandableType: expandableType,
      expandRowByClick: expandableConfig.expandRowByClick,
      expandedRowRender: expandableConfig.expandedRowRender,
      onTriggerExpand: onTriggerExpand,
      expandIconColumnIndex: expandableConfig.expandIconColumnIndex,
      indentSize: expandableConfig.indentSize,
      allColumnsFixedLeft: flattenColumns.every(function (col) {
        return col.fixed === 'left';
      }),
      // Column
      columns: columns,
      flattenColumns: flattenColumns,
      onColumnResize: onColumnResize,
      // Row
      hoverStartRow: startRow,
      hoverEndRow: endRow,
      onHover: onHover
    };
  }, [
  // Table
  prefixCls, getComponent, scrollbarSize, direction, fixedInfoList, isSticky, supportSticky, componentWidth, fixHeader, fixColumn, horizonScroll,
  // Body
  mergedTableLayout, rowClassName, expandableConfig.expandedRowClassName, mergedExpandIcon, expandableType, expandableConfig.expandRowByClick, expandableConfig.expandedRowRender, onTriggerExpand, expandableConfig.expandIconColumnIndex, expandableConfig.indentSize,
  // Column
  columns, flattenColumns, onColumnResize,
  // Row
  startRow, endRow, onHover]);
  return /*#__PURE__*/React.createElement(_TableContext.default.Provider, {
    value: TableContextValue
  }, fullTable);
}
function genTable(shouldTriggerRender) {
  return (0, _context.makeImmutable)(Table, shouldTriggerRender);
}
var ImmutableTable = genTable();
ImmutableTable.EXPAND_COLUMN = _constant.EXPAND_COLUMN;
ImmutableTable.INTERNAL_HOOKS = _constant.INTERNAL_HOOKS;
ImmutableTable.Column = _Column.default;
ImmutableTable.ColumnGroup = _ColumnGroup.default;
ImmutableTable.Summary = _Footer.FooterComponents;
var _default = ImmutableTable;
exports.default = _default;