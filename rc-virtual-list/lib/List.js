"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawList = RawList;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _classnames = _interopRequireDefault(require("classnames"));
var _rcResizeObserver = _interopRequireDefault(require("rc-resize-observer"));
var _Filler = _interopRequireDefault(require("./Filler"));
var _ScrollBar = _interopRequireDefault(require("./ScrollBar"));
var _useChildren = _interopRequireDefault(require("./hooks/useChildren"));
var _useHeights3 = _interopRequireDefault(require("./hooks/useHeights"));
var _useScrollTo = _interopRequireDefault(require("./hooks/useScrollTo"));
var _useDiffItem3 = _interopRequireDefault(require("./hooks/useDiffItem"));
var _useFrameWheel3 = _interopRequireDefault(require("./hooks/useFrameWheel"));
var _useMobileTouchMove = _interopRequireDefault(require("./hooks/useMobileTouchMove"));
var _useOriginScroll = _interopRequireDefault(require("./hooks/useOriginScroll"));
var _useLayoutEffect = _interopRequireDefault(require("rc-util/lib/hooks/useLayoutEffect"));
var _scrollbarUtil = require("./utils/scrollbarUtil");
var _rcUtil = require("rc-util");
var _useGetSize = require("./hooks/useGetSize");
var _excluded = ["prefixCls", "className", "height", "itemHeight", "fullHeight", "style", "data", "children", "itemKey", "virtual", "direction", "scrollWidth", "component", "onScroll", "onVirtualScroll", "onVisibleChange", "innerProps", "extraRender"];
var EMPTY_DATA = [];
var ScrollStyle = {
  overflowY: 'auto',
  overflowAnchor: 'none'
};
function RawList(props, ref) {
  var _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-virtual-list' : _props$prefixCls,
    className = props.className,
    height = props.height,
    itemHeight = props.itemHeight,
    _props$fullHeight = props.fullHeight,
    fullHeight = _props$fullHeight === void 0 ? true : _props$fullHeight,
    style = props.style,
    data = props.data,
    children = props.children,
    itemKey = props.itemKey,
    virtual = props.virtual,
    direction = props.direction,
    scrollWidth = props.scrollWidth,
    _props$component = props.component,
    Component = _props$component === void 0 ? 'div' : _props$component,
    onScroll = props.onScroll,
    onVirtualScroll = props.onVirtualScroll,
    onVisibleChange = props.onVisibleChange,
    innerProps = props.innerProps,
    extraRender = props.extraRender,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  // ================================= MISC =================================
  var useVirtual = !!(virtual !== false && height && itemHeight);
  var inVirtual = useVirtual && data && itemHeight * data.length > height;
  var isRTL = direction === 'rtl';
  var mergedClassName = (0, _classnames.default)(prefixCls, (0, _defineProperty2.default)({}, "".concat(prefixCls, "-rtl"), isRTL), className);
  var mergedData = data || EMPTY_DATA;
  var componentRef = (0, React.useRef)();
  var fillerInnerRef = (0, React.useRef)();
  // =============================== Item Key ===============================
  var _useState = (0, React.useState)(0),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    offsetTop = _useState2[0],
    setOffsetTop = _useState2[1];
  var _useState3 = (0, React.useState)(0),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    offsetLeft = _useState4[0],
    setOffsetLeft = _useState4[1];
  var _useState5 = (0, React.useState)(false),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    scrollMoving = _useState6[0],
    setScrollMoving = _useState6[1];
  var onScrollbarStartMove = function onScrollbarStartMove() {
    setScrollMoving(true);
  };
  var onScrollbarStopMove = function onScrollbarStopMove() {
    setScrollMoving(false);
  };
  // =============================== Item Key ===============================
  var getKey = React.useCallback(function (item) {
    if (typeof itemKey === 'function') {
      return itemKey(item);
    }
    return item === null || item === void 0 ? void 0 : item[itemKey];
  }, [itemKey]);
  var sharedConfig = {
    getKey: getKey
  };
  // ================================ Scroll ================================
  function syncScrollTop(newTop) {
    setOffsetTop(function (origin) {
      var value;
      if (typeof newTop === 'function') {
        value = newTop(origin);
      } else {
        value = newTop;
      }
      var alignedTop = keepInRange(value);
      componentRef.current.scrollTop = alignedTop;
      return alignedTop;
    });
  }
  // ================================ Legacy ================================
  // Put ref here since the range is generate by follow
  var rangeRef = (0, React.useRef)({
    start: 0,
    end: mergedData.length
  });
  var diffItemRef = (0, React.useRef)();
  var _useDiffItem = (0, _useDiffItem3.default)(mergedData, getKey),
    _useDiffItem2 = (0, _slicedToArray2.default)(_useDiffItem, 1),
    diffItem = _useDiffItem2[0];
  diffItemRef.current = diffItem;
  // ================================ Height ================================
  var _useHeights = (0, _useHeights3.default)(getKey, null, null),
    _useHeights2 = (0, _slicedToArray2.default)(_useHeights, 4),
    setInstanceRef = _useHeights2[0],
    collectHeight = _useHeights2[1],
    heights = _useHeights2[2],
    heightUpdatedMark = _useHeights2[3];
  // ========================== Visible Calculation =========================
  var _React$useMemo = React.useMemo(function () {
      if (!useVirtual) {
        return {
          scrollHeight: undefined,
          start: 0,
          end: mergedData.length - 1,
          offset: undefined
        };
      }
      // Always use virtual scroll bar in avoid shaking
      if (!inVirtual) {
        var _fillerInnerRef$curre;
        return {
          scrollHeight: ((_fillerInnerRef$curre = fillerInnerRef.current) === null || _fillerInnerRef$curre === void 0 ? void 0 : _fillerInnerRef$curre.offsetHeight) || 0,
          start: 0,
          end: mergedData.length - 1,
          offset: undefined
        };
      }
      var itemTop = 0;
      var startIndex;
      var startOffset;
      var endIndex;
      var dataLen = mergedData.length;
      for (var i = 0; i < dataLen; i += 1) {
        var item = mergedData[i];
        var key = getKey(item);
        var cacheHeight = heights.get(key);
        var currentItemBottom = itemTop + (cacheHeight === undefined ? itemHeight : cacheHeight);
        // Check item top in the range
        if (currentItemBottom >= offsetTop && startIndex === undefined) {
          startIndex = i;
          startOffset = itemTop;
        }
        // Check item bottom in the range. We will render additional one item for motion usage
        if (currentItemBottom > offsetTop + height && endIndex === undefined) {
          endIndex = i;
        }
        itemTop = currentItemBottom;
      }
      // When scrollTop at the end but data cut to small count will reach this
      if (startIndex === undefined) {
        startIndex = 0;
        startOffset = 0;
        endIndex = Math.ceil(height / itemHeight);
      }
      if (endIndex === undefined) {
        endIndex = mergedData.length - 1;
      }
      // Give cache to improve scroll experience
      endIndex = Math.min(endIndex + 1, mergedData.length - 1);
      return {
        scrollHeight: itemTop,
        start: startIndex,
        end: endIndex,
        offset: startOffset
      };
    }, [inVirtual, useVirtual, offsetTop, mergedData, heightUpdatedMark, height]),
    scrollHeight = _React$useMemo.scrollHeight,
    start = _React$useMemo.start,
    end = _React$useMemo.end,
    fillerOffset = _React$useMemo.offset;
  rangeRef.current.start = start;
  rangeRef.current.end = end;
  // ================================= Size =================================
  var _React$useState = React.useState({
      width: 0,
      height: height
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    size = _React$useState2[0],
    setSize = _React$useState2[1];
  var onHolderResize = function onHolderResize(sizeInfo) {
    setSize(sizeInfo);
  };
  // Hack on scrollbar to enable flash call
  var verticalScrollBarRef = (0, React.useRef)();
  var horizontalScrollBarRef = (0, React.useRef)();
  var horizontalScrollBarSpinSize = React.useMemo(function () {
    return (0, _scrollbarUtil.getSpinSize)(size.width, scrollWidth);
  }, [size.width, scrollWidth]);
  var verticalScrollBarSpinSize = React.useMemo(function () {
    return (0, _scrollbarUtil.getSpinSize)(size.height, scrollHeight);
  }, [size.height, scrollHeight]);
  // =============================== In Range ===============================
  var maxScrollHeight = scrollHeight - height;
  var maxScrollHeightRef = (0, React.useRef)(maxScrollHeight);
  maxScrollHeightRef.current = maxScrollHeight;
  function keepInRange(newScrollTop) {
    var newTop = newScrollTop;
    if (!Number.isNaN(maxScrollHeightRef.current)) {
      newTop = Math.min(newTop, maxScrollHeightRef.current);
    }
    newTop = Math.max(newTop, 0);
    return newTop;
  }
  var isScrollAtTop = offsetTop <= 0;
  var isScrollAtBottom = offsetTop >= maxScrollHeight;
  var originScroll = (0, _useOriginScroll.default)(isScrollAtTop, isScrollAtBottom);
  // ================================ Scroll ================================
  var getVirtualScrollInfo = function getVirtualScrollInfo() {
    return {
      x: isRTL ? -offsetLeft : offsetLeft,
      y: offsetTop
    };
  };
  var lastVirtualScrollInfoRef = (0, React.useRef)(getVirtualScrollInfo());
  var triggerScroll = (0, _rcUtil.useEvent)(function () {
    if (onVirtualScroll) {
      var nextInfo = getVirtualScrollInfo();
      // Trigger when offset changed
      if (lastVirtualScrollInfoRef.current.x !== nextInfo.x || lastVirtualScrollInfoRef.current.y !== nextInfo.y) {
        onVirtualScroll(nextInfo);
        lastVirtualScrollInfoRef.current = nextInfo;
      }
    }
  });
  function onScrollBar(newScrollOffset, horizontal) {
    var newOffset = newScrollOffset;
    if (horizontal) {
      (0, _reactDom.flushSync)(function () {
        setOffsetLeft(newOffset);
      });
      triggerScroll();
    } else {
      syncScrollTop(newOffset);
    }
  }
  // When data size reduce. It may trigger native scroll event back to fit scroll position
  function onFallbackScroll(e) {
    var newScrollTop = e.currentTarget.scrollTop;
    if (newScrollTop !== offsetTop) {
      syncScrollTop(newScrollTop);
    }
    // Trigger origin onScroll
    onScroll === null || onScroll === void 0 ? void 0 : onScroll(e);
    triggerScroll();
  }
  var keepInHorizontalRange = function keepInHorizontalRange(nextOffsetLeft) {
    var tmpOffsetLeft = nextOffsetLeft;
    var max = scrollWidth - size.width;
    tmpOffsetLeft = Math.max(tmpOffsetLeft, 0);
    tmpOffsetLeft = Math.min(tmpOffsetLeft, max);
    return tmpOffsetLeft;
  };
  var onWheelDelta = (0, _rcUtil.useEvent)(function (offsetXY, fromHorizontal) {
    if (fromHorizontal) {
      // Horizontal scroll no need sync virtual position
      (0, _reactDom.flushSync)(function () {
        setOffsetLeft(function (left) {
          var nextOffsetLeft = left + (isRTL ? -offsetXY : offsetXY);
          return keepInHorizontalRange(nextOffsetLeft);
        });
      });
      triggerScroll();
    } else {
      syncScrollTop(function (top) {
        var newTop = top + offsetXY;
        return newTop;
      });
    }
  });
  // Since this added in global,should use ref to keep update
  var _useFrameWheel = (0, _useFrameWheel3.default)(useVirtual, isScrollAtTop, isScrollAtBottom, !!scrollWidth, onWheelDelta),
    _useFrameWheel2 = (0, _slicedToArray2.default)(_useFrameWheel, 2),
    onRawWheel = _useFrameWheel2[0],
    onFireFoxScroll = _useFrameWheel2[1];
  // Mobile touch move
  (0, _useMobileTouchMove.default)(useVirtual, componentRef, function (deltaY, smoothOffset) {
    if (originScroll(deltaY, smoothOffset)) {
      return false;
    }
    onRawWheel({
      preventDefault: function preventDefault() {},
      deltaY: deltaY
    });
    return true;
  });
  (0, _useLayoutEffect.default)(function () {
    // Firefox only
    function onMozMousePixelScroll(e) {
      if (useVirtual) {
        e.preventDefault();
      }
    }
    var componentEle = componentRef.current;
    componentEle.addEventListener('wheel', onRawWheel);
    componentEle.addEventListener('DOMMouseScroll', onFireFoxScroll);
    componentEle.addEventListener('MozMousePixelScroll', onMozMousePixelScroll);
    return function () {
      componentEle.removeEventListener('wheel', onRawWheel);
      componentEle.removeEventListener('DOMMouseScroll', onFireFoxScroll);
      componentEle.removeEventListener('MozMousePixelScroll', onMozMousePixelScroll);
    };
  }, [useVirtual]);
  // ================================= Ref ==================================
  var delayHideScrollBar = function delayHideScrollBar() {
    var _verticalScrollBarRef, _horizontalScrollBarR;
    (_verticalScrollBarRef = verticalScrollBarRef.current) === null || _verticalScrollBarRef === void 0 ? void 0 : _verticalScrollBarRef.delayHidden();
    (_horizontalScrollBarR = horizontalScrollBarRef.current) === null || _horizontalScrollBarR === void 0 ? void 0 : _horizontalScrollBarR.delayHidden();
  };
  var _scrollTo = (0, _useScrollTo.default)(componentRef, mergedData, heights, itemHeight, getKey, collectHeight, syncScrollTop, delayHideScrollBar);
  React.useImperativeHandle(ref, function () {
    return {
      getScrollInfo: getVirtualScrollInfo,
      scrollTo: function scrollTo(config) {
        function isPosScroll(arg) {
          return arg && (0, _typeof2.default)(arg) === 'object' && ('left' in arg || 'top' in arg);
        }
        if (isPosScroll(config)) {
          // Scroll X
          if (config.left !== undefined) {
            setOffsetLeft(keepInHorizontalRange(config.left));
          }
          // Scroll Y
          _scrollTo(config.top);
        } else {
          _scrollTo(config);
        }
      }
    };
  });
  // ================================ Effect ================================
  /** We need told outside that some list not rendered */
  (0, _useLayoutEffect.default)(function () {
    if (onVisibleChange) {
      var renderList = mergedData.slice(start, end + 1);
      onVisibleChange(renderList, mergedData);
    }
  }, [start, end, mergedData]);
  // ================================ Extra =================================
  var getSize = (0, _useGetSize.useGetSize)(mergedData, getKey, heights, itemHeight);
  var extraContent = extraRender === null || extraRender === void 0 ? void 0 : extraRender({
    start: start,
    end: end,
    virtual: inVirtual,
    offsetX: offsetLeft,
    offsetY: fillerOffset,
    rtl: isRTL,
    getSize: getSize
  });
  // ================================ Render ================================
  var listChildren = (0, _useChildren.default)(mergedData, start, end, scrollWidth, setInstanceRef, children, sharedConfig);
  var componentStyle = null;
  if (height) {
    componentStyle = (0, _objectSpread3.default)((0, _defineProperty2.default)({}, fullHeight ? 'height' : 'maxHeight', height), ScrollStyle);
    if (useVirtual) {
      componentStyle.overflowY = 'hidden';
      if (scrollWidth) {
        componentStyle.overflowX = 'hidden';
      }
      if (scrollMoving) {
        componentStyle.pointerEvents = 'none';
      }
    }
  }
  var containerProps = {};
  if (isRTL) {
    containerProps.dir = 'rtl';
  }
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    style: (0, _objectSpread3.default)((0, _objectSpread3.default)({}, style), {}, {
      position: 'relative'
    }),
    className: mergedClassName
  }, containerProps, restProps), /*#__PURE__*/React.createElement(_rcResizeObserver.default, {
    onResize: onHolderResize
  }, /*#__PURE__*/React.createElement(Component, {
    className: "".concat(prefixCls, "-holder"),
    style: componentStyle,
    ref: componentRef,
    onScroll: onFallbackScroll,
    onMouseEnter: delayHideScrollBar
  }, /*#__PURE__*/React.createElement(_Filler.default, {
    prefixCls: prefixCls,
    height: scrollHeight,
    offsetX: offsetLeft,
    offsetY: fillerOffset,
    scrollWidth: scrollWidth,
    onInnerResize: collectHeight,
    ref: fillerInnerRef,
    innerProps: innerProps,
    rtl: isRTL,
    extra: extraContent
  }, listChildren))), inVirtual && scrollHeight > height && /*#__PURE__*/React.createElement(_ScrollBar.default, {
    ref: verticalScrollBarRef,
    prefixCls: prefixCls,
    scrollOffset: offsetTop,
    scrollRange: scrollHeight,
    rtl: isRTL,
    onScroll: onScrollBar,
    onStartMove: onScrollbarStartMove,
    onStopMove: onScrollbarStopMove,
    spinSize: verticalScrollBarSpinSize,
    containerSize: size.height
  }), inVirtual && scrollWidth && /*#__PURE__*/React.createElement(_ScrollBar.default, {
    ref: horizontalScrollBarRef,
    prefixCls: prefixCls,
    scrollOffset: offsetLeft,
    scrollRange: scrollWidth,
    rtl: isRTL,
    onScroll: onScrollBar,
    onStartMove: onScrollbarStartMove,
    onStopMove: onScrollbarStopMove,
    spinSize: horizontalScrollBarSpinSize,
    containerSize: size.width,
    horizontal: true
  }));
}
var List = /*#__PURE__*/React.forwardRef(RawList);
List.displayName = 'List';
var _default = List;
exports.default = _default;