"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const genStyle = token => {
  const {
    componentCls
  } = token;
  return {
    [`${componentCls}-wrapper-rtl`]: {
      direction: 'rtl',
      table: {
        direction: 'rtl'
      },
      [`${componentCls}-pagination-left`]: {
        justifyContent: 'flex-end'
      },
      [`${componentCls}-pagination-right`]: {
        justifyContent: 'flex-start'
      },
      [`${componentCls}-row-expand-icon`]: {
        float: 'right',
        '&::after': {
          transform: 'rotate(-90deg)'
        },
        '&-collapsed::before': {
          transform: 'rotate(180deg)'
        },
        '&-collapsed::after': {
          transform: 'rotate(0deg)'
        }
      },
      [`${componentCls}-container`]: {
        '&::before': {
          insetInlineStart: 'unset',
          insetInlineEnd: 0
        },
        '&::after': {
          insetInlineStart: 0,
          insetInlineEnd: 'unset'
        },
        [`${componentCls}-row-indent`]: {
          float: 'right'
        }
      }
    }
  };
};
var _default = genStyle;
exports.default = _default;