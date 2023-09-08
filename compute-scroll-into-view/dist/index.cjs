"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const t=t=>"object"==typeof t&&null!=t&&1===t.nodeType,e=(t,e)=>(!e||"hidden"!==t)&&("visible"!==t&&"clip"!==t),n=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return e(o.overflowY,n)||e(o.overflowX,n)||(t=>{const e=(t=>{if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}})(t);return!!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)})(t)}return!1},o=(t,e,n,o,i,l,r,d)=>l<t&&r>e||l>t&&r<e?0:l<=t&&d<=n||r>=e&&d>=n?l-t-o:r>e&&d<n||l<t&&d>n?r-e+i:0,i=t=>{const e=t.parentElement;return null==e?t.getRootNode().host||null:e};exports.compute=(e,l)=>{var r,d,s,c;if("undefined"==typeof document)return[];const{scrollMode:h,block:u,inline:f,boundary:a,skipOverflowHiddenElements:m}=l,g="function"==typeof a?a:t=>t!==a;if(!t(e))throw new TypeError("Invalid target");const p=document.scrollingElement||document.documentElement,w=[];let W=e;for(;t(W)&&g(W);){if(W=i(W),W===p){w.push(W);break}null!=W&&W===document.body&&n(W)&&!n(document.documentElement)||null!=W&&n(W,m)&&w.push(W)}const b=null!=(d=null==(r=window.visualViewport)?void 0:r.width)?d:innerWidth,H=null!=(c=null==(s=window.visualViewport)?void 0:s.height)?c:innerHeight,{scrollX:v,scrollY:y}=window,{height:M,width:E,top:x,right:I,bottom:C,left:R}=e.getBoundingClientRect();let T="start"===u||"nearest"===u?x:"end"===u?C:x+M/2,V="center"===f?R+E/2:"end"===f?I:R;const k=[];for(let t=0;t<w.length;t++){const e=w[t],{height:n,width:i,top:l,right:r,bottom:d,left:s}=e.getBoundingClientRect();if("if-needed"===h&&x>=0&&R>=0&&C<=H&&I<=b&&x>=l&&C<=d&&R>=s&&I<=r)return k;const c=getComputedStyle(e),a=parseInt(c.borderLeftWidth,10),m=parseInt(c.borderTopWidth,10),g=parseInt(c.borderRightWidth,10),W=parseInt(c.borderBottomWidth,10);let B=0,D=0;const j="offsetWidth"in e?e.offsetWidth-e.clientWidth-a-g:0,L="offsetHeight"in e?e.offsetHeight-e.clientHeight-m-W:0,O="offsetWidth"in e?0===e.offsetWidth?0:i/e.offsetWidth:0,S="offsetHeight"in e?0===e.offsetHeight?0:n/e.offsetHeight:0;if(p===e)B="start"===u?T:"end"===u?T-H:"nearest"===u?o(y,y+H,H,m,W,y+T,y+T+M,M):T-H/2,D="start"===f?V:"center"===f?V-b/2:"end"===f?V-b:o(v,v+b,b,a,g,v+V,v+V+E,E),B=Math.max(0,B+y),D=Math.max(0,D+v);else{B="start"===u?T-l-m:"end"===u?T-d+W+L:"nearest"===u?o(l,d,n,m,W+L,T,T+M,M):T-(l+n/2)+L/2,D="start"===f?V-s-a:"center"===f?V-(s+i/2)+j/2:"end"===f?V-r+g+j:o(s,r,i,a,g+j,V,V+E,E);const{scrollLeft:t,scrollTop:c}=e;B=Math.max(0,Math.min(c+B/S,e.scrollHeight-n/S+L)),D=Math.max(0,Math.min(t+D/O,e.scrollWidth-i/O+j)),T+=c-B,V+=t-D}k.push({el:e,top:B,left:D})}return k};//# sourceMappingURL=index.cjs.map