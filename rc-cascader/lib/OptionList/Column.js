"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIX_LABEL = void 0;
exports.default = Column;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classnames = _interopRequireDefault(require("classnames"));
var React = _interopRequireWildcard(require("react"));
var _context = _interopRequireDefault(require("../context"));
var _useSearchOptions = require("../hooks/useSearchOptions");
var _commonUtil = require("../utils/commonUtil");
var _Checkbox = _interopRequireDefault(require("./Checkbox"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var FIX_LABEL = '__cascader_fix_label__';
exports.FIX_LABEL = FIX_LABEL;
function Column(_ref) {
  var prefixCls = _ref.prefixCls,
    multiple = _ref.multiple,
    options = _ref.options,
    activeValue = _ref.activeValue,
    prevValuePath = _ref.prevValuePath,
    onToggleOpen = _ref.onToggleOpen,
    onSelect = _ref.onSelect,
    onActive = _ref.onActive,
    checkedSet = _ref.checkedSet,
    halfCheckedSet = _ref.halfCheckedSet,
    loadingKeys = _ref.loadingKeys,
    isSelectable = _ref.isSelectable,
    searchValue = _ref.searchValue;
  var menuPrefixCls = "".concat(prefixCls, "-menu");
  var menuItemPrefixCls = "".concat(prefixCls, "-menu-item");
  var _React$useContext = React.useContext(_context.default),
    fieldNames = _React$useContext.fieldNames,
    changeOnSelect = _React$useContext.changeOnSelect,
    expandTrigger = _React$useContext.expandTrigger,
    expandIcon = _React$useContext.expandIcon,
    loadingIcon = _React$useContext.loadingIcon,
    dropdownMenuColumnStyle = _React$useContext.dropdownMenuColumnStyle;
  var hoverOpen = expandTrigger === 'hover';

  // ============================ Option ============================
  var optionInfoList = React.useMemo(function () {
    return options.map(function (option) {
      var _option$FIX_LABEL;
      var disabled = option.disabled,
        disableCheckbox = option.disableCheckbox;
      var searchOptions = option[_useSearchOptions.SEARCH_MARK];
      var label = (_option$FIX_LABEL = option[FIX_LABEL]) !== null && _option$FIX_LABEL !== void 0 ? _option$FIX_LABEL : option[fieldNames.label];
      var value = option[fieldNames.value];
      var isMergedLeaf = (0, _commonUtil.isLeaf)(option, fieldNames);

      // Get real value of option. Search option is different way.
      var fullPath = searchOptions ? searchOptions.map(function (opt) {
        return opt[fieldNames.value];
      }) : [].concat((0, _toConsumableArray2.default)(prevValuePath), [value]);
      var fullPathKey = (0, _commonUtil.toPathKey)(fullPath);
      var isLoading = loadingKeys.includes(fullPathKey);

      // >>>>> checked
      var checked = checkedSet.has(fullPathKey);

      // >>>>> halfChecked
      var halfChecked = halfCheckedSet.has(fullPathKey);
      return {
        disabled: disabled,
        label: label,
        value: value,
        isLeaf: isMergedLeaf,
        isLoading: isLoading,
        checked: checked,
        halfChecked: halfChecked,
        option: option,
        disableCheckbox: disableCheckbox,
        fullPath: fullPath,
        fullPathKey: fullPathKey
      };
    });
  }, [options, checkedSet, fieldNames, halfCheckedSet, loadingKeys, prevValuePath]);

  // ============================ Render ============================
  return /*#__PURE__*/React.createElement("ul", {
    className: menuPrefixCls,
    role: "menu"
  }, optionInfoList.map(function (_ref2) {
    var _classNames;
    var disabled = _ref2.disabled,
      label = _ref2.label,
      value = _ref2.value,
      isMergedLeaf = _ref2.isLeaf,
      isLoading = _ref2.isLoading,
      checked = _ref2.checked,
      halfChecked = _ref2.halfChecked,
      option = _ref2.option,
      fullPath = _ref2.fullPath,
      fullPathKey = _ref2.fullPathKey,
      disableCheckbox = _ref2.disableCheckbox;
    // >>>>> Open
    var triggerOpenPath = function triggerOpenPath() {
      if (disabled || searchValue) {
        return;
      }
      var nextValueCells = (0, _toConsumableArray2.default)(fullPath);
      if (hoverOpen && isMergedLeaf) {
        nextValueCells.pop();
      }
      onActive(nextValueCells);
    };

    // >>>>> Selection
    var triggerSelect = function triggerSelect() {
      if (isSelectable(option)) {
        onSelect(fullPath, isMergedLeaf);
      }
    };

    // >>>>> Title
    var title;
    if (typeof option.title === 'string') {
      title = option.title;
    } else if (typeof label === 'string') {
      title = label;
    }

    // >>>>> Render
    return /*#__PURE__*/React.createElement("li", {
      key: fullPathKey,
      className: (0, _classnames.default)(menuItemPrefixCls, (_classNames = {}, (0, _defineProperty2.default)(_classNames, "".concat(menuItemPrefixCls, "-expand"), !isMergedLeaf), (0, _defineProperty2.default)(_classNames, "".concat(menuItemPrefixCls, "-active"), activeValue === value || activeValue === fullPathKey), (0, _defineProperty2.default)(_classNames, "".concat(menuItemPrefixCls, "-disabled"), disabled), (0, _defineProperty2.default)(_classNames, "".concat(menuItemPrefixCls, "-loading"), isLoading), _classNames)),
      style: dropdownMenuColumnStyle,
      role: "menuitemcheckbox",
      title: title,
      "aria-checked": checked,
      "data-path-key": fullPathKey,
      onClick: function onClick() {
        triggerOpenPath();
        if (disableCheckbox) {
          return;
        }
        if (!multiple || isMergedLeaf) {
          triggerSelect();
        }
      },
      onDoubleClick: function onDoubleClick() {
        if (changeOnSelect) {
          onToggleOpen(false);
        }
      },
      onMouseEnter: function onMouseEnter() {
        if (hoverOpen) {
          triggerOpenPath();
        }
      },
      onMouseDown: function onMouseDown(e) {
        // Prevent selector from blurring
        e.preventDefault();
      }
    }, multiple && /*#__PURE__*/React.createElement(_Checkbox.default, {
      prefixCls: "".concat(prefixCls, "-checkbox"),
      checked: checked,
      halfChecked: halfChecked,
      disabled: disabled || disableCheckbox,
      disableCheckbox: disableCheckbox,
      onClick: function onClick(e) {
        if (disableCheckbox) {
          return;
        }
        e.stopPropagation();
        triggerSelect();
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "".concat(menuItemPrefixCls, "-content")
    }, label), !isLoading && expandIcon && !isMergedLeaf && /*#__PURE__*/React.createElement("div", {
      className: "".concat(menuItemPrefixCls, "-expand-icon")
    }, expandIcon), isLoading && loadingIcon && /*#__PURE__*/React.createElement("div", {
      className: "".concat(menuItemPrefixCls, "-loading-icon")
    }, loadingIcon));
  }));
}