"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));
var _useEvent = _interopRequireDefault(require("rc-util/lib/hooks/useEvent"));
var _raf = _interopRequireDefault(require("rc-util/lib/raf"));
var _ref3 = require("rc-util/lib/ref");
var React = _interopRequireWildcard(require("react"));
var _useOffsets = _interopRequireDefault(require("../hooks/useOffsets"));
var _useSyncState5 = _interopRequireDefault(require("../hooks/useSyncState"));
var _useTouchMove = _interopRequireDefault(require("../hooks/useTouchMove"));
var _useUpdate = _interopRequireWildcard(require("../hooks/useUpdate"));
var _useVisibleRange3 = _interopRequireDefault(require("../hooks/useVisibleRange"));
var _TabContext = _interopRequireDefault(require("../TabContext"));
var _util = require("../util");
var _AddButton = _interopRequireDefault(require("./AddButton"));
var _ExtraContent = _interopRequireDefault(require("./ExtraContent"));
var _OperationNode = _interopRequireDefault(require("./OperationNode"));
var _TabNode = _interopRequireDefault(require("./TabNode"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var getSize = function getSize(refObj) {
  var _ref = refObj.current || {},
    _ref$offsetWidth = _ref.offsetWidth,
    offsetWidth = _ref$offsetWidth === void 0 ? 0 : _ref$offsetWidth,
    _ref$offsetHeight = _ref.offsetHeight,
    offsetHeight = _ref$offsetHeight === void 0 ? 0 : _ref$offsetHeight;
  return [offsetWidth, offsetHeight];
};

/**
 * Convert `SizeInfo` to unit value. Such as [123, 456] with `top` position get `123`
 */
var getUnitValue = function getUnitValue(size, tabPositionTopOrBottom) {
  return size[tabPositionTopOrBottom ? 0 : 1];
};
function TabNavList(props, ref) {
  var _classNames;
  var _React$useContext = React.useContext(_TabContext.default),
    prefixCls = _React$useContext.prefixCls,
    tabs = _React$useContext.tabs;
  var className = props.className,
    style = props.style,
    id = props.id,
    animated = props.animated,
    activeKey = props.activeKey,
    rtl = props.rtl,
    extra = props.extra,
    editable = props.editable,
    locale = props.locale,
    tabPosition = props.tabPosition,
    tabBarGutter = props.tabBarGutter,
    children = props.children,
    onTabClick = props.onTabClick,
    onTabScroll = props.onTabScroll;
  var containerRef = (0, React.useRef)();
  var extraLeftRef = (0, React.useRef)();
  var extraRightRef = (0, React.useRef)();
  var tabsWrapperRef = (0, React.useRef)();
  var tabListRef = (0, React.useRef)();
  var operationsRef = (0, React.useRef)();
  var innerAddButtonRef = (0, React.useRef)();
  // const [getBtnRef, removeBtnRef] = useRefs<HTMLDivElement>();

  var tabPositionTopOrBottom = tabPosition === 'top' || tabPosition === 'bottom';
  var _useSyncState = (0, _useSyncState5.default)(0, function (next, prev) {
      if (tabPositionTopOrBottom && onTabScroll) {
        onTabScroll({
          direction: next > prev ? 'left' : 'right'
        });
      }
    }),
    _useSyncState2 = (0, _slicedToArray2.default)(_useSyncState, 2),
    transformLeft = _useSyncState2[0],
    setTransformLeft = _useSyncState2[1];
  var _useSyncState3 = (0, _useSyncState5.default)(0, function (next, prev) {
      if (!tabPositionTopOrBottom && onTabScroll) {
        onTabScroll({
          direction: next > prev ? 'top' : 'bottom'
        });
      }
    }),
    _useSyncState4 = (0, _slicedToArray2.default)(_useSyncState3, 2),
    transformTop = _useSyncState4[0],
    setTransformTop = _useSyncState4[1];
  var _useState = (0, React.useState)([0, 0]),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    containerExcludeExtraSize = _useState2[0],
    setContainerExcludeExtraSize = _useState2[1];
  var _useState3 = (0, React.useState)([0, 0]),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    tabContentSize = _useState4[0],
    setTabContentSize = _useState4[1];
  var _useState5 = (0, React.useState)([0, 0]),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    addSize = _useState6[0],
    setAddSize = _useState6[1];
  var _useState7 = (0, React.useState)([0, 0]),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    operationSize = _useState8[0],
    setOperationSize = _useState8[1];
  var _useUpdateState = (0, _useUpdate.useUpdateState)(new Map()),
    _useUpdateState2 = (0, _slicedToArray2.default)(_useUpdateState, 2),
    tabSizes = _useUpdateState2[0],
    setTabSizes = _useUpdateState2[1];
  var tabOffsets = (0, _useOffsets.default)(tabs, tabSizes, tabContentSize[0]);

  // ========================== Unit =========================
  var containerExcludeExtraSizeValue = getUnitValue(containerExcludeExtraSize, tabPositionTopOrBottom);
  var tabContentSizeValue = getUnitValue(tabContentSize, tabPositionTopOrBottom);
  var addSizeValue = getUnitValue(addSize, tabPositionTopOrBottom);
  var operationSizeValue = getUnitValue(operationSize, tabPositionTopOrBottom);
  var needScroll = containerExcludeExtraSizeValue < tabContentSizeValue + addSizeValue;
  var visibleTabContentValue = needScroll ? containerExcludeExtraSizeValue - operationSizeValue : containerExcludeExtraSizeValue - addSizeValue;

  // ========================== Util =========================
  var operationsHiddenClassName = "".concat(prefixCls, "-nav-operations-hidden");
  var transformMin = 0;
  var transformMax = 0;
  if (!tabPositionTopOrBottom) {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  } else if (rtl) {
    transformMin = 0;
    transformMax = Math.max(0, tabContentSizeValue - visibleTabContentValue);
  } else {
    transformMin = Math.min(0, visibleTabContentValue - tabContentSizeValue);
    transformMax = 0;
  }
  function alignInRange(value) {
    if (value < transformMin) {
      return transformMin;
    }
    if (value > transformMax) {
      return transformMax;
    }
    return value;
  }

  // ========================= Mobile ========================
  var touchMovingRef = (0, React.useRef)();
  var _useState9 = (0, React.useState)(),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    lockAnimation = _useState10[0],
    setLockAnimation = _useState10[1];
  function doLockAnimation() {
    setLockAnimation(Date.now());
  }
  function clearTouchMoving() {
    window.clearTimeout(touchMovingRef.current);
  }
  (0, _useTouchMove.default)(tabsWrapperRef, function (offsetX, offsetY) {
    function doMove(setState, offset) {
      setState(function (value) {
        var newValue = alignInRange(value + offset);
        return newValue;
      });
    }

    // Skip scroll if place is enough
    if (!needScroll) {
      return false;
    }
    if (tabPositionTopOrBottom) {
      doMove(setTransformLeft, offsetX);
    } else {
      doMove(setTransformTop, offsetY);
    }
    clearTouchMoving();
    doLockAnimation();
    return true;
  });
  (0, React.useEffect)(function () {
    clearTouchMoving();
    if (lockAnimation) {
      touchMovingRef.current = window.setTimeout(function () {
        setLockAnimation(0);
      }, 100);
    }
    return clearTouchMoving;
  }, [lockAnimation]);

  // ===================== Visible Range =====================
  // Render tab node & collect tab offset
  var _useVisibleRange = (0, _useVisibleRange3.default)(tabOffsets,
    // Container
    visibleTabContentValue,
    // Transform
    tabPositionTopOrBottom ? transformLeft : transformTop,
    // Tabs
    tabContentSizeValue,
    // Add
    addSizeValue,
    // Operation
    operationSizeValue, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
      tabs: tabs
    })),
    _useVisibleRange2 = (0, _slicedToArray2.default)(_useVisibleRange, 2),
    visibleStart = _useVisibleRange2[0],
    visibleEnd = _useVisibleRange2[1];

  // ========================= Scroll ========================
  var scrollToTab = (0, _useEvent.default)(function () {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : activeKey;
    var tabOffset = tabOffsets.get(key) || {
      width: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0
    };
    if (tabPositionTopOrBottom) {
      // ============ Align with top & bottom ============
      var newTransform = transformLeft;

      // RTL
      if (rtl) {
        if (tabOffset.right < transformLeft) {
          newTransform = tabOffset.right;
        } else if (tabOffset.right + tabOffset.width > transformLeft + visibleTabContentValue) {
          newTransform = tabOffset.right + tabOffset.width - visibleTabContentValue;
        }
      }
      // LTR
      else if (tabOffset.left < -transformLeft) {
        newTransform = -tabOffset.left;
      } else if (tabOffset.left + tabOffset.width > -transformLeft + visibleTabContentValue) {
        newTransform = -(tabOffset.left + tabOffset.width - visibleTabContentValue);
      }
      setTransformTop(0);
      setTransformLeft(alignInRange(newTransform));
    } else {
      // ============ Align with left & right ============
      var _newTransform = transformTop;
      if (tabOffset.top < -transformTop) {
        _newTransform = -tabOffset.top;
      } else if (tabOffset.top + tabOffset.height > -transformTop + visibleTabContentValue) {
        _newTransform = -(tabOffset.top + tabOffset.height - visibleTabContentValue);
      }
      setTransformLeft(0);
      setTransformTop(alignInRange(_newTransform));
    }
  });

  // ========================== Tab ==========================
  var tabNodeStyle = {};
  if (tabPosition === 'top' || tabPosition === 'bottom') {
    tabNodeStyle[rtl ? 'marginRight' : 'marginLeft'] = tabBarGutter;
  } else {
    tabNodeStyle.marginTop = tabBarGutter;
  }
  var tabNodes = tabs.map(function (tab, i) {
    var key = tab.key;
    return /*#__PURE__*/React.createElement(_TabNode.default, {
      id: id,
      prefixCls: prefixCls,
      key: key,
      tab: tab
      /* first node should not have margin left */,
      style: i === 0 ? undefined : tabNodeStyle,
      closable: tab.closable,
      editable: editable,
      active: key === activeKey,
      renderWrapper: children,
      removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
      onClick: function onClick(e) {
        onTabClick(key, e);
      },
      onFocus: function onFocus() {
        scrollToTab(key);
        doLockAnimation();
        if (!tabsWrapperRef.current) {
          return;
        }
        // Focus element will make scrollLeft change which we should reset back
        if (!rtl) {
          tabsWrapperRef.current.scrollLeft = 0;
        }
        tabsWrapperRef.current.scrollTop = 0;
      }
    });
  });

  // Update buttons records
  var updateTabSizes = function updateTabSizes() {
    return setTabSizes(function () {
      var newSizes = new Map();
      tabs.forEach(function (_ref2) {
        var _tabListRef$current;
        var key = _ref2.key;
        var btnNode = (_tabListRef$current = tabListRef.current) === null || _tabListRef$current === void 0 ? void 0 : _tabListRef$current.querySelector("[data-node-key=\"".concat((0, _util.genDataNodeKey)(key), "\"]"));
        if (btnNode) {
          newSizes.set(key, {
            width: btnNode.offsetWidth,
            height: btnNode.offsetHeight,
            left: btnNode.offsetLeft,
            top: btnNode.offsetTop
          });
        }
      });
      return newSizes;
    });
  };
  (0, React.useEffect)(function () {
    updateTabSizes();
  }, [tabs.map(function (tab) {
    return tab.key;
  }).join('_')]);
  var onListHolderResize = (0, _useUpdate.default)(function () {
    // Update wrapper records
    var containerSize = getSize(containerRef);
    var extraLeftSize = getSize(extraLeftRef);
    var extraRightSize = getSize(extraRightRef);
    setContainerExcludeExtraSize([containerSize[0] - extraLeftSize[0] - extraRightSize[0], containerSize[1] - extraLeftSize[1] - extraRightSize[1]]);
    var newAddSize = getSize(innerAddButtonRef);
    setAddSize(newAddSize);
    var newOperationSize = getSize(operationsRef);
    setOperationSize(newOperationSize);

    // Which includes add button size
    var tabContentFullSize = getSize(tabListRef);
    setTabContentSize([tabContentFullSize[0] - newAddSize[0], tabContentFullSize[1] - newAddSize[1]]);

    // Update buttons records
    updateTabSizes();
  });

  // ======================== Dropdown =======================
  var startHiddenTabs = tabs.slice(0, visibleStart);
  var endHiddenTabs = tabs.slice(visibleEnd + 1);
  var hiddenTabs = [].concat((0, _toConsumableArray2.default)(startHiddenTabs), (0, _toConsumableArray2.default)(endHiddenTabs));

  // =================== Link & Operations ===================
  var _useState11 = (0, React.useState)(),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    inkStyle = _useState12[0],
    setInkStyle = _useState12[1];
  var activeTabOffset = tabOffsets.get(activeKey);

  // Delay set ink style to avoid remove tab blink
  var inkBarRafRef = (0, React.useRef)();
  function cleanInkBarRaf() {
    _raf.default.cancel(inkBarRafRef.current);
  }
  (0, React.useEffect)(function () {
    var newInkStyle = {};
    if (activeTabOffset) {
      if (tabPositionTopOrBottom) {
        if (rtl) {
          newInkStyle.right = activeTabOffset.right;
        } else {
          newInkStyle.left = activeTabOffset.left;
        }
        newInkStyle.width = activeTabOffset.width;
      } else {
        newInkStyle.top = activeTabOffset.top;
        newInkStyle.height = activeTabOffset.height;
      }
    }
    cleanInkBarRaf();
    inkBarRafRef.current = (0, _raf.default)(function () {
      setInkStyle(newInkStyle);
    });
    return cleanInkBarRaf;
  }, [activeTabOffset, tabPositionTopOrBottom, rtl]);

  // ========================= Effect ========================
  (0, React.useEffect)(function () {
    scrollToTab();
    // eslint-disable-next-line
  }, [activeKey, transformMin, transformMax, (0, _util.stringify)(activeTabOffset), (0, _util.stringify)(tabOffsets), tabPositionTopOrBottom]);

  // Should recalculate when rtl changed
  (0, React.useEffect)(function () {
    onListHolderResize();
    // eslint-disable-next-line
  }, [rtl]);

  // ========================= Render ========================
  var hasDropdown = !!hiddenTabs.length;
  var wrapPrefix = "".concat(prefixCls, "-nav-wrap");
  var pingLeft;
  var pingRight;
  var pingTop;
  var pingBottom;
  if (tabPositionTopOrBottom) {
    if (rtl) {
      pingRight = transformLeft > 0;
      pingLeft = transformLeft !== transformMax;
    } else {
      pingLeft = transformLeft < 0;
      pingRight = transformLeft !== transformMin;
    }
  } else {
    pingTop = transformTop < 0;
    pingBottom = transformTop !== transformMin;
  }
  return /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
    onResize: onListHolderResize
  }, /*#__PURE__*/React.createElement("div", {
    ref: (0, _ref3.useComposeRef)(ref, containerRef),
    role: "tablist",
    className: (0, _classnames.default)("".concat(prefixCls, "-nav"), className),
    style: style,
    onKeyDown: function onKeyDown() {
      // No need animation when use keyboard
      doLockAnimation();
    }
  }, /*#__PURE__*/React.createElement(_ExtraContent.default, {
    ref: extraLeftRef,
    position: "left",
    extra: extra,
    prefixCls: prefixCls
  }), /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)(wrapPrefix, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-left"), pingLeft), (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-right"), pingRight), (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-top"), pingTop), (0, _defineProperty2.default)(_classNames, "".concat(wrapPrefix, "-ping-bottom"), pingBottom), _classNames)),
    ref: tabsWrapperRef
  }, /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
    onResize: onListHolderResize
  }, /*#__PURE__*/React.createElement("div", {
    ref: tabListRef,
    className: "".concat(prefixCls, "-nav-list"),
    style: {
      transform: "translate(".concat(transformLeft, "px, ").concat(transformTop, "px)"),
      transition: lockAnimation ? 'none' : undefined
    }
  }, tabNodes, /*#__PURE__*/React.createElement(_AddButton.default, {
    ref: innerAddButtonRef,
    prefixCls: prefixCls,
    locale: locale,
    editable: editable,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, tabNodes.length === 0 ? undefined : tabNodeStyle), {}, {
      visibility: hasDropdown ? 'hidden' : null
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: (0, _classnames.default)("".concat(prefixCls, "-ink-bar"), (0, _defineProperty2.default)({}, "".concat(prefixCls, "-ink-bar-animated"), animated.inkBar)),
    style: inkStyle
  })))), /*#__PURE__*/React.createElement(_OperationNode.default, (0, _extends2.default)({}, props, {
    removeAriaLabel: locale === null || locale === void 0 ? void 0 : locale.removeAriaLabel,
    ref: operationsRef,
    prefixCls: prefixCls,
    tabs: hiddenTabs,
    className: !hasDropdown && operationsHiddenClassName,
    tabMoving: !!lockAnimation
  })), /*#__PURE__*/React.createElement(_ExtraContent.default, {
    ref: extraRightRef,
    position: "right",
    extra: extra,
    prefixCls: prefixCls
  })));
  /* eslint-enable */
}
var _default = /*#__PURE__*/React.forwardRef(TabNavList);
exports.default = _default;