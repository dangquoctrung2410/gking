"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cssinjs = require("@ant-design/cssinjs");
var _style = require("../../style");
var _internal = require("../../theme/internal");
var _placement = _interopRequireDefault(require("./placement"));
const genNotificationStyle = token => {
  const {
    iconCls,
    componentCls,
    // .ant-notification
    boxShadow,
    fontSizeLG,
    notificationMarginBottom,
    borderRadiusLG,
    colorSuccess,
    colorInfo,
    colorWarning,
    colorError,
    colorTextHeading,
    notificationBg,
    notificationPadding,
    notificationMarginEdge,
    motionDurationMid,
    motionEaseInOut,
    fontSize,
    lineHeight,
    width,
    notificationIconSize,
    colorText
  } = token;
  const noticeCls = `${componentCls}-notice`;
  const notificationFadeIn = new _cssinjs.Keyframes('antNotificationFadeIn', {
    '0%': {
      left: {
        _skip_check_: true,
        value: width
      },
      opacity: 0
    },
    '100%': {
      left: {
        _skip_check_: true,
        value: 0
      },
      opacity: 1
    }
  });
  const notificationFadeOut = new _cssinjs.Keyframes('antNotificationFadeOut', {
    '0%': {
      maxHeight: token.animationMaxHeight,
      marginBottom: notificationMarginBottom,
      opacity: 1
    },
    '100%': {
      maxHeight: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0
    }
  });
  const noticeStyle = {
    position: 'relative',
    width,
    maxWidth: `calc(100vw - ${notificationMarginEdge * 2}px)`,
    marginBottom: notificationMarginBottom,
    marginInlineStart: 'auto',
    padding: notificationPadding,
    overflow: 'hidden',
    lineHeight,
    wordWrap: 'break-word',
    background: notificationBg,
    borderRadius: borderRadiusLG,
    boxShadow,
    [`${componentCls}-close-icon`]: {
      fontSize,
      cursor: 'pointer'
    },
    [`${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      color: colorTextHeading,
      fontSize: fontSizeLG,
      lineHeight: token.lineHeightLG
    },
    [`${noticeCls}-description`]: {
      fontSize,
      color: colorText
    },
    [`&${noticeCls}-closable ${noticeCls}-message`]: {
      paddingInlineEnd: token.paddingLG
    },
    [`${noticeCls}-with-icon ${noticeCls}-message`]: {
      marginBottom: token.marginXS,
      marginInlineStart: token.marginSM + notificationIconSize,
      fontSize: fontSizeLG
    },
    [`${noticeCls}-with-icon ${noticeCls}-description`]: {
      marginInlineStart: token.marginSM + notificationIconSize,
      fontSize
    },
    // Icon & color style in different selector level
    // https://github.com/ant-design/ant-design/issues/16503
    // https://github.com/ant-design/ant-design/issues/15512
    [`${noticeCls}-icon`]: {
      position: 'absolute',
      fontSize: notificationIconSize,
      lineHeight: 0,
      // icon-font
      [`&-success${iconCls}`]: {
        color: colorSuccess
      },
      [`&-info${iconCls}`]: {
        color: colorInfo
      },
      [`&-warning${iconCls}`]: {
        color: colorWarning
      },
      [`&-error${iconCls}`]: {
        color: colorError
      }
    },
    [`${noticeCls}-close`]: {
      position: 'absolute',
      top: token.notificationPaddingVertical,
      insetInlineEnd: token.notificationPaddingHorizontal,
      color: token.colorIcon,
      outline: 'none',
      width: token.notificationCloseButtonSize,
      height: token.notificationCloseButtonSize,
      borderRadius: token.borderRadiusSM,
      transition: `background-color ${token.motionDurationMid}, color ${token.motionDurationMid}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        color: token.colorIconHover,
        backgroundColor: token.wireframe ? 'transparent' : token.colorFillContent
      }
    },
    [`${noticeCls}-btn`]: {
      float: 'right',
      marginTop: token.marginSM
    }
  };
  return [
  // ============================ Holder ============================
  {
    [componentCls]: Object.assign(Object.assign(Object.assign(Object.assign({}, (0, _style.resetComponent)(token)), {
      position: 'fixed',
      zIndex: token.zIndexPopup,
      marginInlineEnd: notificationMarginEdge,
      [`${componentCls}-hook-holder`]: {
        position: 'relative'
      },
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        [noticeCls]: {
          marginInline: 'auto auto'
        }
      },
      [`&${componentCls}-topLeft, &${componentCls}-bottomLeft`]: {
        [noticeCls]: {
          marginInlineEnd: 'auto',
          marginInlineStart: 0
        }
      },
      //  animation
      [`${componentCls}-fade-enter, ${componentCls}-fade-appear`]: {
        animationDuration: token.motionDurationMid,
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',
        opacity: 0,
        animationPlayState: 'paused'
      },
      [`${componentCls}-fade-leave`]: {
        animationTimingFunction: motionEaseInOut,
        animationFillMode: 'both',
        animationDuration: motionDurationMid,
        animationPlayState: 'paused'
      },
      [`${componentCls}-fade-enter${componentCls}-fade-enter-active, ${componentCls}-fade-appear${componentCls}-fade-appear-active`]: {
        animationName: notificationFadeIn,
        animationPlayState: 'running'
      },
      [`${componentCls}-fade-leave${componentCls}-fade-leave-active`]: {
        animationName: notificationFadeOut,
        animationPlayState: 'running'
      }
    }), (0, _placement.default)(token)), {
      // RTL
      '&-rtl': {
        direction: 'rtl',
        [`${noticeCls}-btn`]: {
          float: 'left'
        }
      }
    })
  },
  // ============================ Notice ============================
  {
    [componentCls]: {
      [noticeCls]: Object.assign({}, noticeStyle)
    }
  },
  // ============================= Pure =============================
  {
    [`${noticeCls}-pure-panel`]: Object.assign(Object.assign({}, noticeStyle), {
      margin: 0
    })
  }];
};
// ============================== Export ==============================
var _default = (0, _internal.genComponentStyleHook)('Notification', token => {
  const notificationPaddingVertical = token.paddingMD;
  const notificationPaddingHorizontal = token.paddingLG;
  const notificationToken = (0, _internal.mergeToken)(token, {
    // index.less variables
    notificationBg: token.colorBgElevated,
    notificationPaddingVertical,
    notificationPaddingHorizontal,
    notificationIconSize: token.fontSizeLG * token.lineHeightLG,
    notificationCloseButtonSize: token.controlHeightLG * 0.55,
    notificationMarginBottom: token.margin,
    notificationPadding: `${token.paddingMD}px ${token.paddingContentHorizontalLG}px`,
    notificationMarginEdge: token.marginLG,
    animationMaxHeight: 150
  });
  return [genNotificationStyle(notificationToken)];
}, token => ({
  zIndexPopup: token.zIndexPopupBase + 50,
  width: 384
}));
exports.default = _default;