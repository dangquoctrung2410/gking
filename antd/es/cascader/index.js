'use client';

import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import * as React from 'react';
import LeftOutlined from "@ant-design/icons/es/icons/LeftOutlined";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import RightOutlined from "@ant-design/icons/es/icons/RightOutlined";
import classNames from 'classnames';
import RcCascader from 'rc-cascader';
import omit from "rc-util/es/omit";
import { getTransitionName } from '../_util/motion';
import genPurePanel from '../_util/PurePanel';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';
import DefaultRenderEmpty from '../config-provider/defaultRenderEmpty';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import { FormItemInputContext } from '../form/context';
import useSelectStyle from '../select/style';
import useBuiltinPlacements from '../select/useBuiltinPlacements';
import useShowArrow from '../select/useShowArrow';
import getIcons from '../select/utils/iconUtil';
import { useCompactItemContext } from '../space/Compact';
import useStyle from './style';
const {
  SHOW_CHILD,
  SHOW_PARENT
} = RcCascader;
function highlightKeyword(str, lowerKeyword, prefixCls) {
  const cells = str.toLowerCase().split(lowerKeyword).reduce((list, cur, index) => index === 0 ? [cur] : [].concat(_toConsumableArray(list), [lowerKeyword, cur]), []);
  const fillCells = [];
  let start = 0;
  cells.forEach((cell, index) => {
    const end = start + cell.length;
    let originWorld = str.slice(start, end);
    start = end;
    if (index % 2 === 1) {
      originWorld =
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      React.createElement("span", {
        className: `${prefixCls}-menu-item-keyword`,
        key: `separator-${index}`
      }, originWorld);
    }
    fillCells.push(originWorld);
  });
  return fillCells;
}
const defaultSearchRender = (inputValue, path, prefixCls, fieldNames) => {
  const optionList = [];
  // We do lower here to save perf
  const lower = inputValue.toLowerCase();
  path.forEach((node, index) => {
    if (index !== 0) {
      optionList.push(' / ');
    }
    let label = node[fieldNames.label];
    const type = typeof label;
    if (type === 'string' || type === 'number') {
      label = highlightKeyword(String(label), lower, prefixCls);
    }
    optionList.push(label);
  });
  return optionList;
};
const Cascader = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      prefixCls: customizePrefixCls,
      size: customizeSize,
      disabled: customDisabled,
      className,
      rootClassName,
      multiple,
      bordered = true,
      transitionName,
      choiceTransitionName = '',
      popupClassName,
      dropdownClassName,
      expandIcon,
      placement,
      showSearch,
      allowClear = true,
      notFoundContent,
      direction,
      getPopupContainer,
      status: customStatus,
      showArrow,
      builtinPlacements,
      style
    } = props,
    rest = __rest(props, ["prefixCls", "size", "disabled", "className", "rootClassName", "multiple", "bordered", "transitionName", "choiceTransitionName", "popupClassName", "dropdownClassName", "expandIcon", "placement", "showSearch", "allowClear", "notFoundContent", "direction", "getPopupContainer", "status", "showArrow", "builtinPlacements", "style"]);
  const restProps = omit(rest, ['suffixIcon']);
  const {
    getPopupContainer: getContextPopupContainer,
    getPrefixCls,
    renderEmpty,
    direction: rootDirection,
    popupOverflow,
    cascader
  } = React.useContext(ConfigContext);
  const mergedDirection = direction || rootDirection;
  const isRtl = mergedDirection === 'rtl';
  // =================== Form =====================
  const {
    status: contextStatus,
    hasFeedback,
    isFormItemInput,
    feedbackIcon
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);
  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== "production" ? warning(!dropdownClassName, 'Cascader', '`dropdownClassName` is deprecated. Please use `popupClassName` instead.') : void 0;
    process.env.NODE_ENV !== "production" ? warning(!('showArrow' in props), 'Cascader', '`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.') : void 0;
  }
  // =================== No Found ====================
  const mergedNotFoundContent = notFoundContent || (renderEmpty === null || renderEmpty === void 0 ? void 0 : renderEmpty('Cascader')) || /*#__PURE__*/React.createElement(DefaultRenderEmpty, {
    componentName: "Cascader"
  });
  // ==================== Prefix =====================
  const rootPrefixCls = getPrefixCls();
  const prefixCls = getPrefixCls('select', customizePrefixCls);
  const cascaderPrefixCls = getPrefixCls('cascader', customizePrefixCls);
  const [wrapSelectSSR, hashId] = useSelectStyle(prefixCls);
  const [wrapCascaderSSR] = useStyle(cascaderPrefixCls);
  const {
    compactSize,
    compactItemClassnames
  } = useCompactItemContext(prefixCls, direction);
  // =================== Dropdown ====================
  const mergedDropdownClassName = classNames(popupClassName || dropdownClassName, `${cascaderPrefixCls}-dropdown`, {
    [`${cascaderPrefixCls}-dropdown-rtl`]: mergedDirection === 'rtl'
  }, rootClassName, hashId);
  // ==================== Search =====================
  const mergedShowSearch = React.useMemo(() => {
    if (!showSearch) {
      return showSearch;
    }
    let searchConfig = {
      render: defaultSearchRender
    };
    if (typeof showSearch === 'object') {
      searchConfig = Object.assign(Object.assign({}, searchConfig), showSearch);
    }
    return searchConfig;
  }, [showSearch]);
  // ===================== Size ======================
  const mergedSize = useSize(ctx => {
    var _a;
    return (_a = customizeSize !== null && customizeSize !== void 0 ? customizeSize : compactSize) !== null && _a !== void 0 ? _a : ctx;
  });
  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled !== null && customDisabled !== void 0 ? customDisabled : disabled;
  // ===================== Icon ======================
  let mergedExpandIcon = expandIcon;
  if (!expandIcon) {
    mergedExpandIcon = isRtl ? /*#__PURE__*/React.createElement(LeftOutlined, null) : /*#__PURE__*/React.createElement(RightOutlined, null);
  }
  const loadingIcon = /*#__PURE__*/React.createElement("span", {
    className: `${prefixCls}-menu-item-loading-icon`
  }, /*#__PURE__*/React.createElement(LoadingOutlined, {
    spin: true
  }));
  // =================== Multiple ====================
  const checkable = React.useMemo(() => multiple ? /*#__PURE__*/React.createElement("span", {
    className: `${cascaderPrefixCls}-checkbox-inner`
  }) : false, [multiple]);
  // ===================== Icons =====================
  const showSuffixIcon = useShowArrow(props.suffixIcon, showArrow);
  const {
    suffixIcon,
    removeIcon,
    clearIcon
  } = getIcons(Object.assign(Object.assign({}, props), {
    hasFeedback,
    feedbackIcon,
    showSuffixIcon,
    multiple,
    prefixCls,
    componentName: 'Cascader'
  }));
  // ===================== Placement =====================
  const memoPlacement = React.useMemo(() => {
    if (placement !== undefined) {
      return placement;
    }
    return isRtl ? 'bottomRight' : 'bottomLeft';
  }, [placement, isRtl]);
  const mergedBuiltinPlacements = useBuiltinPlacements(builtinPlacements, popupOverflow);
  const mergedAllowClear = allowClear === true ? {
    clearIcon
  } : allowClear;
  // ==================== Render =====================
  const renderNode = /*#__PURE__*/React.createElement(RcCascader, Object.assign({
    prefixCls: prefixCls,
    className: classNames(!customizePrefixCls && cascaderPrefixCls, {
      [`${prefixCls}-lg`]: mergedSize === 'large',
      [`${prefixCls}-sm`]: mergedSize === 'small',
      [`${prefixCls}-rtl`]: isRtl,
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-in-form-item`]: isFormItemInput
    }, getStatusClassNames(prefixCls, mergedStatus, hasFeedback), compactItemClassnames, cascader === null || cascader === void 0 ? void 0 : cascader.className, className, rootClassName, hashId),
    disabled: mergedDisabled,
    style: Object.assign(Object.assign({}, cascader === null || cascader === void 0 ? void 0 : cascader.style), style)
  }, restProps, {
    builtinPlacements: mergedBuiltinPlacements,
    direction: mergedDirection,
    placement: memoPlacement,
    notFoundContent: mergedNotFoundContent,
    allowClear: mergedAllowClear,
    showSearch: mergedShowSearch,
    expandIcon: mergedExpandIcon,
    suffixIcon: suffixIcon,
    removeIcon: removeIcon,
    loadingIcon: loadingIcon,
    checkable: checkable,
    dropdownClassName: mergedDropdownClassName,
    dropdownPrefixCls: customizePrefixCls || cascaderPrefixCls,
    choiceTransitionName: getTransitionName(rootPrefixCls, '', choiceTransitionName),
    transitionName: getTransitionName(rootPrefixCls, 'slide-up', transitionName),
    getPopupContainer: getPopupContainer || getContextPopupContainer,
    ref: ref
  }));
  return wrapCascaderSSR(wrapSelectSSR(renderNode));
});
if (process.env.NODE_ENV !== 'production') {
  Cascader.displayName = 'Cascader';
}
// We don't care debug panel
/* istanbul ignore next */
const PurePanel = genPurePanel(Cascader);
Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
Cascader._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;
export default Cascader;