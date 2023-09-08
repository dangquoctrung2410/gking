"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _internal = require("../../theme/internal");
// =============================== Base ===============================
const genBaseStyle = token => {
  const {
    componentCls,
    iconCls,
    antCls,
    zIndexPopup,
    colorText,
    colorWarning,
    marginXXS,
    marginXS,
    fontSize,
    fontWeightStrong,
    colorTextHeading
  } = token;
  return {
    [componentCls]: {
      zIndex: zIndexPopup,
      [`&${antCls}-popover`]: {
        fontSize
      },
      [`${componentCls}-message`]: {
        marginBottom: marginXS,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'start',
        [`> ${componentCls}-message-icon ${iconCls}`]: {
          color: colorWarning,
          fontSize,
          lineHeight: 1,
          marginInlineEnd: marginXS
        },
        [`${componentCls}-title`]: {
          fontWeight: fontWeightStrong,
          color: colorTextHeading,
          '&:only-child': {
            fontWeight: 'normal'
          }
        },
        [`${componentCls}-description`]: {
          marginTop: marginXXS,
          color: colorText
        }
      },
      [`${componentCls}-buttons`]: {
        textAlign: 'end',
        whiteSpace: 'nowrap',
        button: {
          marginInlineStart: marginXS
        }
      }
    }
  };
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Popconfirm', token => genBaseStyle(token), token => {
  const {
    zIndexPopupBase
  } = token;
  return {
    zIndexPopup: zIndexPopupBase + 60
  };
});
exports.default = _default;