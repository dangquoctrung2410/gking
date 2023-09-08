"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.flattenKeys = flattenKeys;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _FilterFilled = _interopRequireDefault(require("@ant-design/icons/FilterFilled"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isEqual = _interopRequireDefault(require("rc-util/lib/isEqual"));
var React = _interopRequireWildcard(require("react"));
var _useSyncState = _interopRequireDefault(require("../../../_util/hooks/useSyncState"));
var _warning = _interopRequireDefault(require("../../../_util/warning"));
var _button = _interopRequireDefault(require("../../../button"));
var _checkbox = _interopRequireDefault(require("../../../checkbox"));
var _context = require("../../../config-provider/context");
var _dropdown = _interopRequireDefault(require("../../../dropdown"));
var _empty = _interopRequireDefault(require("../../../empty"));
var _menu = _interopRequireDefault(require("../../../menu"));
var _OverrideContext = require("../../../menu/OverrideContext");
var _radio = _interopRequireDefault(require("../../../radio"));
var _tree = _interopRequireDefault(require("../../../tree"));
var _FilterSearch = _interopRequireDefault(require("./FilterSearch"));
var _FilterWrapper = _interopRequireDefault(require("./FilterWrapper"));
function flattenKeys(filters) {
  let keys = [];
  (filters || []).forEach(_ref => {
    let {
      value,
      children
    } = _ref;
    keys.push(value);
    if (children) {
      keys = [].concat((0, _toConsumableArray2.default)(keys), (0, _toConsumableArray2.default)(flattenKeys(children)));
    }
  });
  return keys;
}
function hasSubMenu(filters) {
  return filters.some(_ref2 => {
    let {
      children
    } = _ref2;
    return children;
  });
}
function searchValueMatched(searchValue, text) {
  if (typeof text === 'string' || typeof text === 'number') {
    return text === null || text === void 0 ? void 0 : text.toString().toLowerCase().includes(searchValue.trim().toLowerCase());
  }
  return false;
}
function renderFilterItems(_ref3) {
  let {
    filters,
    prefixCls,
    filteredKeys,
    filterMultiple,
    searchValue,
    filterSearch
  } = _ref3;
  return filters.map((filter, index) => {
    const key = String(filter.value);
    if (filter.children) {
      return {
        key: key || index,
        label: filter.text,
        popupClassName: `${prefixCls}-dropdown-submenu`,
        children: renderFilterItems({
          filters: filter.children,
          prefixCls,
          filteredKeys,
          filterMultiple,
          searchValue,
          filterSearch
        })
      };
    }
    const Component = filterMultiple ? _checkbox.default : _radio.default;
    const item = {
      key: filter.value !== undefined ? key : index,
      label: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Component, {
        checked: filteredKeys.includes(key)
      }), /*#__PURE__*/React.createElement("span", null, filter.text))
    };
    if (searchValue.trim()) {
      if (typeof filterSearch === 'function') {
        return filterSearch(searchValue, filter) ? item : null;
      }
      return searchValueMatched(searchValue, filter.text) ? item : null;
    }
    return item;
  });
}
function FilterDropdown(props) {
  var _a, _b;
  const {
    tablePrefixCls,
    prefixCls,
    column,
    dropdownPrefixCls,
    columnKey,
    filterMultiple,
    filterMode = 'menu',
    filterSearch = false,
    filterState,
    triggerFilter,
    locale,
    children,
    getPopupContainer
  } = props;
  const {
    filterDropdownOpen,
    onFilterDropdownOpenChange,
    filterResetToDefaultFilteredValue,
    defaultFilteredValue,
    // Deprecated
    filterDropdownVisible,
    onFilterDropdownVisibleChange
  } = column;
  const [visible, setVisible] = React.useState(false);
  const filtered = !!(filterState && (((_a = filterState.filteredKeys) === null || _a === void 0 ? void 0 : _a.length) || filterState.forceFiltered));
  const triggerVisible = newVisible => {
    setVisible(newVisible);
    onFilterDropdownOpenChange === null || onFilterDropdownOpenChange === void 0 ? void 0 : onFilterDropdownOpenChange(newVisible);
    onFilterDropdownVisibleChange === null || onFilterDropdownVisibleChange === void 0 ? void 0 : onFilterDropdownVisibleChange(newVisible);
  };
  if (process.env.NODE_ENV !== 'production') {
    [['filterDropdownVisible', 'filterDropdownOpen', filterDropdownVisible], ['onFilterDropdownVisibleChange', 'onFilterDropdownOpenChange', onFilterDropdownVisibleChange]].forEach(_ref4 => {
      let [deprecatedName, newName, prop] = _ref4;
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(prop === undefined || prop === null, 'Table', `\`${deprecatedName}\` is deprecated. Please use \`${newName}\` instead.`) : void 0;
    });
  }
  const mergedVisible = (_b = filterDropdownOpen !== null && filterDropdownOpen !== void 0 ? filterDropdownOpen : filterDropdownVisible) !== null && _b !== void 0 ? _b : visible;
  // ===================== Select Keys =====================
  const propFilteredKeys = filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys;
  const [getFilteredKeysSync, setFilteredKeysSync] = (0, _useSyncState.default)(propFilteredKeys || []);
  const onSelectKeys = _ref5 => {
    let {
      selectedKeys
    } = _ref5;
    setFilteredKeysSync(selectedKeys);
  };
  const onCheck = (keys, _ref6) => {
    let {
      node,
      checked
    } = _ref6;
    if (!filterMultiple) {
      onSelectKeys({
        selectedKeys: checked && node.key ? [node.key] : []
      });
    } else {
      onSelectKeys({
        selectedKeys: keys
      });
    }
  };
  React.useEffect(() => {
    if (!visible) {
      return;
    }
    onSelectKeys({
      selectedKeys: propFilteredKeys || []
    });
  }, [propFilteredKeys]);
  // ====================== Open Keys ======================
  const [openKeys, setOpenKeys] = React.useState([]);
  const onOpenChange = keys => {
    setOpenKeys(keys);
  };
  // search in tree mode column filter
  const [searchValue, setSearchValue] = React.useState('');
  const onSearch = e => {
    const {
      value
    } = e.target;
    setSearchValue(value);
  };
  // clear search value after close filter dropdown
  React.useEffect(() => {
    if (!visible) {
      setSearchValue('');
    }
  }, [visible]);
  // ======================= Submit ========================
  const internalTriggerFilter = keys => {
    const mergedKeys = keys && keys.length ? keys : null;
    if (mergedKeys === null && (!filterState || !filterState.filteredKeys)) {
      return null;
    }
    if ((0, _isEqual.default)(mergedKeys, filterState === null || filterState === void 0 ? void 0 : filterState.filteredKeys, true)) {
      return null;
    }
    triggerFilter({
      column,
      key: columnKey,
      filteredKeys: mergedKeys
    });
  };
  const onConfirm = () => {
    triggerVisible(false);
    internalTriggerFilter(getFilteredKeysSync());
  };
  const onReset = function () {
    let {
      confirm,
      closeDropdown
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      confirm: false,
      closeDropdown: false
    };
    if (confirm) {
      internalTriggerFilter([]);
    }
    if (closeDropdown) {
      triggerVisible(false);
    }
    setSearchValue('');
    if (filterResetToDefaultFilteredValue) {
      setFilteredKeysSync((defaultFilteredValue || []).map(key => String(key)));
    } else {
      setFilteredKeysSync([]);
    }
  };
  const doFilter = function () {
    let {
      closeDropdown
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      closeDropdown: true
    };
    if (closeDropdown) {
      triggerVisible(false);
    }
    internalTriggerFilter(getFilteredKeysSync());
  };
  const onVisibleChange = newVisible => {
    if (newVisible && propFilteredKeys !== undefined) {
      // Sync filteredKeys on appear in controlled mode (propFilteredKeys !== undefined)
      setFilteredKeysSync(propFilteredKeys || []);
    }
    triggerVisible(newVisible);
    // Default will filter when closed
    if (!newVisible && !column.filterDropdown) {
      onConfirm();
    }
  };
  // ======================== Style ========================
  const dropdownMenuClass = (0, _classnames.default)({
    [`${dropdownPrefixCls}-menu-without-submenu`]: !hasSubMenu(column.filters || [])
  });
  const onCheckAll = e => {
    if (e.target.checked) {
      const allFilterKeys = flattenKeys(column === null || column === void 0 ? void 0 : column.filters).map(key => String(key));
      setFilteredKeysSync(allFilterKeys);
    } else {
      setFilteredKeysSync([]);
    }
  };
  const getTreeData = _ref7 => {
    let {
      filters
    } = _ref7;
    return (filters || []).map((filter, index) => {
      const key = String(filter.value);
      const item = {
        title: filter.text,
        key: filter.value !== undefined ? key : index
      };
      if (filter.children) {
        item.children = getTreeData({
          filters: filter.children
        });
      }
      return item;
    });
  };
  const getFilterData = node => {
    var _a;
    return Object.assign(Object.assign({}, node), {
      text: node.title,
      value: node.key,
      children: ((_a = node.children) === null || _a === void 0 ? void 0 : _a.map(item => getFilterData(item))) || []
    });
  };
  let dropdownContent;
  if (typeof column.filterDropdown === 'function') {
    dropdownContent = column.filterDropdown({
      prefixCls: `${dropdownPrefixCls}-custom`,
      setSelectedKeys: selectedKeys => onSelectKeys({
        selectedKeys
      }),
      selectedKeys: getFilteredKeysSync(),
      confirm: doFilter,
      clearFilters: onReset,
      filters: column.filters,
      visible: mergedVisible,
      close: () => {
        triggerVisible(false);
      }
    });
  } else if (column.filterDropdown) {
    dropdownContent = column.filterDropdown;
  } else {
    const selectedKeys = getFilteredKeysSync() || [];
    const getFilterComponent = () => {
      if ((column.filters || []).length === 0) {
        return /*#__PURE__*/React.createElement(_empty.default, {
          image: _empty.default.PRESENTED_IMAGE_SIMPLE,
          description: locale.filterEmptyText,
          imageStyle: {
            height: 24
          },
          style: {
            margin: 0,
            padding: '16px 0'
          }
        });
      }
      if (filterMode === 'tree') {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_FilterSearch.default, {
          filterSearch: filterSearch,
          value: searchValue,
          onChange: onSearch,
          tablePrefixCls: tablePrefixCls,
          locale: locale
        }), /*#__PURE__*/React.createElement("div", {
          className: `${tablePrefixCls}-filter-dropdown-tree`
        }, filterMultiple ? /*#__PURE__*/React.createElement(_checkbox.default, {
          checked: selectedKeys.length === flattenKeys(column.filters).length,
          indeterminate: selectedKeys.length > 0 && selectedKeys.length < flattenKeys(column.filters).length,
          className: `${tablePrefixCls}-filter-dropdown-checkall`,
          onChange: onCheckAll
        }, locale.filterCheckall) : null, /*#__PURE__*/React.createElement(_tree.default, {
          checkable: true,
          selectable: false,
          blockNode: true,
          multiple: filterMultiple,
          checkStrictly: !filterMultiple,
          className: `${dropdownPrefixCls}-menu`,
          onCheck: onCheck,
          checkedKeys: selectedKeys,
          selectedKeys: selectedKeys,
          showIcon: false,
          treeData: getTreeData({
            filters: column.filters
          }),
          autoExpandParent: true,
          defaultExpandAll: true,
          filterTreeNode: searchValue.trim() ? node => {
            if (typeof filterSearch === 'function') {
              return filterSearch(searchValue, getFilterData(node));
            }
            return searchValueMatched(searchValue, node.title);
          } : undefined
        })));
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_FilterSearch.default, {
        filterSearch: filterSearch,
        value: searchValue,
        onChange: onSearch,
        tablePrefixCls: tablePrefixCls,
        locale: locale
      }), /*#__PURE__*/React.createElement(_menu.default, {
        selectable: true,
        multiple: filterMultiple,
        prefixCls: `${dropdownPrefixCls}-menu`,
        className: dropdownMenuClass,
        onSelect: onSelectKeys,
        onDeselect: onSelectKeys,
        selectedKeys: selectedKeys,
        getPopupContainer: getPopupContainer,
        openKeys: openKeys,
        onOpenChange: onOpenChange,
        items: renderFilterItems({
          filters: column.filters || [],
          filterSearch,
          prefixCls,
          filteredKeys: getFilteredKeysSync(),
          filterMultiple,
          searchValue
        })
      }));
    };
    const getResetDisabled = () => {
      if (filterResetToDefaultFilteredValue) {
        return (0, _isEqual.default)((defaultFilteredValue || []).map(key => String(key)), selectedKeys, true);
      }
      return selectedKeys.length === 0;
    };
    dropdownContent = /*#__PURE__*/React.createElement(React.Fragment, null, getFilterComponent(), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-dropdown-btns`
    }, /*#__PURE__*/React.createElement(_button.default, {
      type: "link",
      size: "small",
      disabled: getResetDisabled(),
      onClick: () => onReset()
    }, locale.filterReset), /*#__PURE__*/React.createElement(_button.default, {
      type: "primary",
      size: "small",
      onClick: onConfirm
    }, locale.filterConfirm)));
  }
  // We should not block customize Menu with additional props
  if (column.filterDropdown) {
    dropdownContent = /*#__PURE__*/React.createElement(_OverrideContext.OverrideProvider, {
      selectable: undefined
    }, dropdownContent);
  }
  const menu = () => /*#__PURE__*/React.createElement(_FilterWrapper.default, {
    className: `${prefixCls}-dropdown`
  }, dropdownContent);
  let filterIcon;
  if (typeof column.filterIcon === 'function') {
    filterIcon = column.filterIcon(filtered);
  } else if (column.filterIcon) {
    filterIcon = column.filterIcon;
  } else {
    filterIcon = /*#__PURE__*/React.createElement(_FilterFilled.default, null);
  }
  const {
    direction
  } = React.useContext(_context.ConfigContext);
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-column`
  }, /*#__PURE__*/React.createElement("span", {
    className: `${tablePrefixCls}-column-title`
  }, children), /*#__PURE__*/React.createElement(_dropdown.default, {
    dropdownRender: menu,
    trigger: ['click'],
    open: mergedVisible,
    onOpenChange: onVisibleChange,
    getPopupContainer: getPopupContainer,
    placement: direction === 'rtl' ? 'bottomLeft' : 'bottomRight'
  }, /*#__PURE__*/React.createElement("span", {
    role: "button",
    tabIndex: -1,
    className: (0, _classnames.default)(`${prefixCls}-trigger`, {
      active: filtered
    }),
    onClick: e => {
      e.stopPropagation();
    }
  }, filterIcon)));
}
var _default = FilterDropdown;
exports.default = _default;