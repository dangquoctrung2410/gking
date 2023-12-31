"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classnames = _interopRequireDefault(require("classnames"));
var _rcInput = require("rc-input");
var _rcTextarea = _interopRequireDefault(require("rc-textarea"));
var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));
var _useMergedState3 = _interopRequireDefault(require("rc-util/lib/hooks/useMergedState"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
var _warning = _interopRequireDefault(require("rc-util/lib/warning"));
var _react = _interopRequireWildcard(require("react"));
var _useEffectState = _interopRequireDefault(require("./hooks/useEffectState"));
var _KeywordTrigger = _interopRequireDefault(require("./KeywordTrigger"));
var _MentionsContext = _interopRequireDefault(require("./MentionsContext"));
var _Option = _interopRequireDefault(require("./Option"));
var _util = require("./util");
var _excluded = ["prefixCls", "className", "style", "prefix", "split", "notFoundContent", "value", "defaultValue", "children", "options", "open", "validateSearch", "filterOption", "onChange", "onKeyDown", "onKeyUp", "onPressEnter", "onSearch", "onSelect", "onFocus", "onBlur", "transitionName", "placement", "direction", "getPopupContainer", "dropdownClassName", "rows"],
  _excluded2 = ["suffix", "prefixCls", "classes", "value"];
var InternalMentions = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _props$prefixCls = props.prefixCls,
    prefixCls = _props$prefixCls === void 0 ? 'rc-mentions' : _props$prefixCls,
    className = props.className,
    style = props.style,
    _props$prefix = props.prefix,
    prefix = _props$prefix === void 0 ? '@' : _props$prefix,
    _props$split = props.split,
    split = _props$split === void 0 ? ' ' : _props$split,
    _props$notFoundConten = props.notFoundContent,
    notFoundContent = _props$notFoundConten === void 0 ? 'Not Found' : _props$notFoundConten,
    value = props.value,
    defaultValue = props.defaultValue,
    children = props.children,
    options = props.options,
    open = props.open,
    _props$validateSearch = props.validateSearch,
    validateSearch = _props$validateSearch === void 0 ? _util.validateSearch : _props$validateSearch,
    _props$filterOption = props.filterOption,
    filterOption = _props$filterOption === void 0 ? _util.filterOption : _props$filterOption,
    onChange = props.onChange,
    onKeyDown = props.onKeyDown,
    onKeyUp = props.onKeyUp,
    onPressEnter = props.onPressEnter,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    onFocus = props.onFocus,
    onBlur = props.onBlur,
    transitionName = props.transitionName,
    placement = props.placement,
    direction = props.direction,
    getPopupContainer = props.getPopupContainer,
    dropdownClassName = props.dropdownClassName,
    _props$rows = props.rows,
    rows = _props$rows === void 0 ? 1 : _props$rows,
    restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var mergedPrefix = (0, _react.useMemo)(function () {
    return Array.isArray(prefix) ? prefix : [prefix];
  }, [prefix]);

  // =============================== Refs ===============================
  var textareaRef = (0, _react.useRef)(null);
  var measureRef = (0, _react.useRef)(null);
  var getTextArea = function getTextArea() {
    var _textareaRef$current, _textareaRef$current$;
    return (_textareaRef$current = textareaRef.current) === null || _textareaRef$current === void 0 ? void 0 : (_textareaRef$current$ = _textareaRef$current.resizableTextArea) === null || _textareaRef$current$ === void 0 ? void 0 : _textareaRef$current$.textArea;
  };
  _react.default.useImperativeHandle(ref, function () {
    var _textareaRef$current4, _textareaRef$current5;
    return {
      focus: function focus() {
        var _textareaRef$current2;
        return (_textareaRef$current2 = textareaRef.current) === null || _textareaRef$current2 === void 0 ? void 0 : _textareaRef$current2.focus();
      },
      blur: function blur() {
        var _textareaRef$current3;
        return (_textareaRef$current3 = textareaRef.current) === null || _textareaRef$current3 === void 0 ? void 0 : _textareaRef$current3.blur();
      },
      textarea: (_textareaRef$current4 = textareaRef.current) === null || _textareaRef$current4 === void 0 ? void 0 : (_textareaRef$current5 = _textareaRef$current4.resizableTextArea) === null || _textareaRef$current5 === void 0 ? void 0 : _textareaRef$current5.textArea
    };
  });

  // ============================== State ===============================
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    measuring = _useState2[0],
    setMeasuring = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    measureText = _useState4[0],
    setMeasureText = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    measurePrefix = _useState6[0],
    setMeasurePrefix = _useState6[1];
  var _useState7 = (0, _react.useState)(0),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    measureLocation = _useState8[0],
    setMeasureLocation = _useState8[1];
  var _useState9 = (0, _react.useState)(0),
    _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
    activeIndex = _useState10[0],
    setActiveIndex = _useState10[1];
  var _useState11 = (0, _react.useState)(false),
    _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
    isFocus = _useState12[0],
    setIsFocus = _useState12[1];

  // ============================== Value ===============================
  var _useMergedState = (0, _useMergedState3.default)('', {
      defaultValue: defaultValue,
      value: value
    }),
    _useMergedState2 = (0, _slicedToArray2.default)(_useMergedState, 2),
    mergedValue = _useMergedState2[0],
    setMergedValue = _useMergedState2[1];

  // =============================== Open ===============================
  (0, _react.useEffect)(function () {
    // Sync measure div top with textarea for rc-trigger usage
    if (measuring && measureRef.current) {
      measureRef.current.scrollTop = getTextArea().scrollTop;
    }
  }, [measuring]);
  var _React$useMemo = _react.default.useMemo(function () {
      if (open) {
        if (process.env.NODE_ENV !== 'production') {
          (0, _warning.default)(false, '`open` of Mentions is only used for debug usage. Do not use in you production.');
        }
        for (var i = 0; i < mergedPrefix.length; i += 1) {
          var curPrefix = mergedPrefix[i];
          var index = mergedValue.lastIndexOf(curPrefix);
          if (index >= 0) {
            return [true, '', curPrefix, index];
          }
        }
      }
      return [measuring, measureText, measurePrefix, measureLocation];
    }, [open, measuring, mergedPrefix, mergedValue, measureText, measurePrefix, measureLocation]),
    _React$useMemo2 = (0, _slicedToArray2.default)(_React$useMemo, 4),
    mergedMeasuring = _React$useMemo2[0],
    mergedMeasureText = _React$useMemo2[1],
    mergedMeasurePrefix = _React$useMemo2[2],
    mergedMeasureLocation = _React$useMemo2[3];

  // ============================== Option ==============================
  var getOptions = _react.default.useCallback(function (targetMeasureText) {
    var list;
    if (options && options.length > 0) {
      list = options.map(function (item) {
        var _item$key;
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, item), {}, {
          key: (_item$key = item === null || item === void 0 ? void 0 : item.key) !== null && _item$key !== void 0 ? _item$key : item.value
        });
      });
    } else {
      list = (0, _toArray.default)(children).map(function (_ref) {
        var optionProps = _ref.props,
          key = _ref.key;
        return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, optionProps), {}, {
          label: optionProps.children,
          key: key || optionProps.value
        });
      });
    }
    return list.filter(function (option) {
      /** Return all result if `filterOption` is false. */
      if (filterOption === false) {
        return true;
      }
      return filterOption(targetMeasureText, option);
    });
  }, [children, options, filterOption]);
  var mergedOptions = _react.default.useMemo(function () {
    return getOptions(mergedMeasureText);
  }, [getOptions, mergedMeasureText]);

  // ============================= Measure ==============================
  // Mark that we will reset input selection to target position when user select option
  var onSelectionEffect = (0, _useEffectState.default)();
  var startMeasure = function startMeasure(nextMeasureText, nextMeasurePrefix, nextMeasureLocation) {
    setMeasuring(true);
    setMeasureText(nextMeasureText);
    setMeasurePrefix(nextMeasurePrefix);
    setMeasureLocation(nextMeasureLocation);
    setActiveIndex(0);
  };
  var stopMeasure = function stopMeasure(callback) {
    setMeasuring(false);
    setMeasureLocation(0);
    setMeasureText('');
    onSelectionEffect(callback);
  };

  // ============================== Change ==============================
  var triggerChange = function triggerChange(nextValue) {
    setMergedValue(nextValue);
    onChange === null || onChange === void 0 ? void 0 : onChange(nextValue);
  };
  var onInternalChange = function onInternalChange(_ref2) {
    var nextValue = _ref2.target.value;
    triggerChange(nextValue);
  };
  var selectOption = function selectOption(option) {
    var _getTextArea;
    var _option$value = option.value,
      mentionValue = _option$value === void 0 ? '' : _option$value;
    var _replaceWithMeasure = (0, _util.replaceWithMeasure)(mergedValue, {
        measureLocation: mergedMeasureLocation,
        targetText: mentionValue,
        prefix: mergedMeasurePrefix,
        selectionStart: (_getTextArea = getTextArea()) === null || _getTextArea === void 0 ? void 0 : _getTextArea.selectionStart,
        split: split
      }),
      text = _replaceWithMeasure.text,
      selectionLocation = _replaceWithMeasure.selectionLocation;
    triggerChange(text);
    stopMeasure(function () {
      // We need restore the selection position
      (0, _util.setInputSelection)(getTextArea(), selectionLocation);
    });
    onSelect === null || onSelect === void 0 ? void 0 : onSelect(option, mergedMeasurePrefix);
  };

  // ============================= KeyEvent =============================
  // Check if hit the measure keyword
  var onInternalKeyDown = function onInternalKeyDown(event) {
    var which = event.which;
    onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);

    // Skip if not measuring
    if (!mergedMeasuring) {
      return;
    }
    if (which === _KeyCode.default.UP || which === _KeyCode.default.DOWN) {
      // Control arrow function
      var optionLen = mergedOptions.length;
      var offset = which === _KeyCode.default.UP ? -1 : 1;
      var newActiveIndex = (activeIndex + offset + optionLen) % optionLen;
      setActiveIndex(newActiveIndex);
      event.preventDefault();
    } else if (which === _KeyCode.default.ESC) {
      stopMeasure();
    } else if (which === _KeyCode.default.ENTER) {
      // Measure hit
      event.preventDefault();
      if (!mergedOptions.length) {
        stopMeasure();
        return;
      }
      var _option = mergedOptions[activeIndex];
      selectOption(_option);
    }
  };

  /**
   * When to start measure:
   * 1. When user press `prefix`
   * 2. When measureText !== prevMeasureText
   *  - If measure hit
   *  - If measuring
   *
   * When to stop measure:
   * 1. Selection is out of range
   * 2. Contains `space`
   * 3. ESC or select one
   */
  var onInternalKeyUp = function onInternalKeyUp(event) {
    var key = event.key,
      which = event.which;
    var target = event.target;
    var selectionStartText = (0, _util.getBeforeSelectionText)(target);
    var _getLastMeasureIndex = (0, _util.getLastMeasureIndex)(selectionStartText, mergedPrefix),
      measureIndex = _getLastMeasureIndex.location,
      nextMeasurePrefix = _getLastMeasureIndex.prefix;

    // If the client implements an onKeyUp handler, call it
    onKeyUp === null || onKeyUp === void 0 ? void 0 : onKeyUp(event);

    // Skip if match the white key list
    if ([_KeyCode.default.ESC, _KeyCode.default.UP, _KeyCode.default.DOWN, _KeyCode.default.ENTER].indexOf(which) !== -1) {
      return;
    }
    if (measureIndex !== -1) {
      var nextMeasureText = selectionStartText.slice(measureIndex + nextMeasurePrefix.length);
      var validateMeasure = validateSearch(nextMeasureText, split);
      var matchOption = !!getOptions(nextMeasureText).length;
      if (validateMeasure) {
        if (key === nextMeasurePrefix || key === 'Shift' || mergedMeasuring || nextMeasureText !== mergedMeasureText && matchOption) {
          startMeasure(nextMeasureText, nextMeasurePrefix, measureIndex);
        }
      } else if (mergedMeasuring) {
        // Stop if measureText is invalidate
        stopMeasure();
      }

      /**
       * We will trigger `onSearch` to developer since they may use for async update.
       * If met `space` means user finished searching.
       */
      if (onSearch && validateMeasure) {
        onSearch(nextMeasureText, nextMeasurePrefix);
      }
    } else if (mergedMeasuring) {
      stopMeasure();
    }
  };
  var onInternalPressEnter = function onInternalPressEnter(event) {
    if (!mergedMeasuring && onPressEnter) {
      onPressEnter(event);
    }
  };

  // ============================ Focus Blur ============================
  var focusRef = (0, _react.useRef)();
  var onInternalFocus = function onInternalFocus(event) {
    window.clearTimeout(focusRef.current);
    if (!isFocus && event && onFocus) {
      onFocus(event);
    }
    setIsFocus(true);
  };
  var onInternalBlur = function onInternalBlur(event) {
    focusRef.current = window.setTimeout(function () {
      setIsFocus(false);
      stopMeasure();
      onBlur === null || onBlur === void 0 ? void 0 : onBlur(event);
    }, 0);
  };
  var onDropdownFocus = function onDropdownFocus() {
    onInternalFocus();
  };
  var onDropdownBlur = function onDropdownBlur() {
    onInternalBlur();
  };

  // ============================== Render ==============================
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, className),
    style: style
  }, /*#__PURE__*/_react.default.createElement(_rcTextarea.default, (0, _extends2.default)({
    ref: textareaRef,
    value: mergedValue
  }, restProps, {
    rows: rows,
    onChange: onInternalChange,
    onKeyDown: onInternalKeyDown,
    onKeyUp: onInternalKeyUp,
    onPressEnter: onInternalPressEnter,
    onFocus: onInternalFocus,
    onBlur: onInternalBlur
  })), mergedMeasuring && /*#__PURE__*/_react.default.createElement("div", {
    ref: measureRef,
    className: "".concat(prefixCls, "-measure")
  }, mergedValue.slice(0, mergedMeasureLocation), /*#__PURE__*/_react.default.createElement(_MentionsContext.default.Provider, {
    value: {
      notFoundContent: notFoundContent,
      activeIndex: activeIndex,
      setActiveIndex: setActiveIndex,
      selectOption: selectOption,
      onFocus: onDropdownFocus,
      onBlur: onDropdownBlur
    }
  }, /*#__PURE__*/_react.default.createElement(_KeywordTrigger.default, {
    prefixCls: prefixCls,
    transitionName: transitionName,
    placement: placement,
    direction: direction,
    options: mergedOptions,
    visible: true,
    getPopupContainer: getPopupContainer,
    dropdownClassName: dropdownClassName
  }, /*#__PURE__*/_react.default.createElement("span", null, mergedMeasurePrefix))), mergedValue.slice(mergedMeasureLocation + mergedMeasurePrefix.length)));
});
var Mentions = /*#__PURE__*/(0, _react.forwardRef)(function (_ref3, ref) {
  var suffix = _ref3.suffix,
    prefixCls = _ref3.prefixCls,
    classes = _ref3.classes,
    value = _ref3.value,
    rest = (0, _objectWithoutProperties2.default)(_ref3, _excluded2);
  return /*#__PURE__*/_react.default.createElement(_rcInput.BaseInput, {
    inputElement: /*#__PURE__*/_react.default.createElement(InternalMentions, (0, _extends2.default)({
      prefixCls: prefixCls,
      ref: ref
    }, rest)),
    suffix: suffix,
    prefixCls: prefixCls,
    classes: classes,
    value: value
  });
});
Mentions.Option = _Option.default;
var _default = Mentions;
exports.default = _default;