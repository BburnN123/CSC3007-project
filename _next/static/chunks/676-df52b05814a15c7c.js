(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[676],{1551:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],l=!0,u=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);l=!0);}catch(i){u=!0,o=i}finally{try{l||null==r.return||r.return()}finally{if(u)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,l=(a=r(7294))&&a.__esModule?a:{default:a},u=r(1003),i=r(880),f=r(9246);function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s={};function d(e,t,r,n){if(e&&u.isLocalURL(t)){e.prefetch(t,r,n).catch((function(e){0}));var o=n&&"undefined"!==typeof n.locale?n.locale:e&&e.locale;s[t+"%"+r+(o?"%"+o:"")]=!0}}var p=l.default.forwardRef((function(e,t){var r,n=e.legacyBehavior,a=void 0===n?!0!==Boolean(!1):n,p=e.href,v=e.as,y=e.children,b=e.prefetch,g=e.passHref,m=e.replace,h=e.shallow,j=e.scroll,w=e.locale,O=e.onClick,E=e.onMouseEnter,k=c(e,["href","as","children","prefetch","passHref","replace","shallow","scroll","locale","onClick","onMouseEnter"]);r=y,a&&"string"===typeof r&&(r=l.default.createElement("a",null,r));var C,I=!1!==b,M=i.useRouter(),x=l.default.useMemo((function(){var e=o(u.resolveHref(M,p,!0),2),t=e[0],r=e[1];return{href:t,as:v?u.resolveHref(M,v):r||t}}),[M,p,v]),N=x.href,S=x.as,A=l.default.useRef(N),L=l.default.useRef(S);a&&(C=l.default.Children.only(r));var R=a?C&&"object"===typeof C&&C.ref:t,_=o(f.useIntersection({rootMargin:"200px"}),3),P=_[0],U=_[1],D=_[2],$=l.default.useCallback((function(e){L.current===S&&A.current===N||(D(),L.current=S,A.current=N),P(e),R&&("function"===typeof R?R(e):"object"===typeof R&&(R.current=e))}),[S,R,N,D,P]);l.default.useEffect((function(){var e=U&&I&&u.isLocalURL(N),t="undefined"!==typeof w?w:M&&M.locale,r=s[N+"%"+S+(t?"%"+t:"")];e&&!r&&d(M,N,S,{locale:t})}),[S,N,U,w,I,M]);var B={ref:$,onClick:function(e){a||"function"!==typeof O||O(e),a&&C.props&&"function"===typeof C.props.onClick&&C.props.onClick(e),e.defaultPrevented||function(e,t,r,n,o,a,l,i){("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(r))&&(e.preventDefault(),t[o?"replace":"push"](r,n,{shallow:a,locale:i,scroll:l}))}(e,M,N,S,m,h,j,w)},onMouseEnter:function(e){a||"function"!==typeof E||E(e),a&&C.props&&"function"===typeof C.props.onMouseEnter&&C.props.onMouseEnter(e),u.isLocalURL(N)&&d(M,N,S,{priority:!0})}};if(!a||g||"a"===C.type&&!("href"in C.props)){var K="undefined"!==typeof w?w:M&&M.locale,H=M&&M.isLocaleDomain&&u.getDomainLocale(S,K,M&&M.locales,M&&M.domainLocales);B.href=H||u.addBasePath(u.addLocale(S,K,M&&M.defaultLocale))}return a?l.default.cloneElement(C,B):l.default.createElement("a",Object.assign({},k,B),r)}));t.default=p,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},9246:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],l=!0,u=!1;try{for(r=r.call(e);!(l=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);l=!0);}catch(i){u=!0,o=i}finally{try{l||null==r.return||r.return()}finally{if(u)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,r=e.rootMargin,n=e.disabled||!u,c=a.useRef(),s=o(a.useState(!1),2),d=s[0],p=s[1],v=o(a.useState(t?t.current:null),2),y=v[0],b=v[1],g=a.useCallback((function(e){c.current&&(c.current(),c.current=void 0),n||d||e&&e.tagName&&(c.current=function(e,t,r){var n=function(e){var t,r={root:e.root||null,margin:e.rootMargin||""},n=f.find((function(e){return e.root===r.root&&e.margin===r.margin}));n?t=i.get(n):(t=i.get(r),f.push(r));if(t)return t;var o=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return i.set(r,t={id:r,observer:a,elements:o}),t}(r),o=n.id,a=n.observer,l=n.elements;return l.set(e,t),a.observe(e),function(){if(l.delete(e),a.unobserve(e),0===l.size){a.disconnect(),i.delete(o);var t=f.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&f.splice(t,1)}}}(e,(function(e){return e&&p(e)}),{root:y,rootMargin:r}))}),[n,y,r,d]),m=a.useCallback((function(){p(!1)}),[]);return a.useEffect((function(){if(!u&&!d){var e=l.requestIdleCallback((function(){return p(!0)}));return function(){return l.cancelIdleCallback(e)}}}),[d]),a.useEffect((function(){t&&b(t.current)}),[t]),[g,d,m]};var a=r(7294),l=r(4686),u="undefined"!==typeof IntersectionObserver;var i=new Map,f=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&(Object.assign(t.default,t),e.exports=t.default)},1664:function(e,t,r){e.exports=r(1551)},3680:function(e,t,r){"use strict";r.d(t,{Z:function(){return d}});var n=r(4184),o=r.n(n),a=r(7294),l=r(5893);const u=["as","disabled"];function i({tagName:e,disabled:t,href:r,target:n,rel:o,onClick:a,tabIndex:l=0,type:u}){e||(e=null!=r||null!=n||null!=o?"a":"button");const i={tagName:e};if("button"===e)return[{type:u||"button",disabled:t},i];const f=n=>{(t||"a"===e&&function(e){return!e||"#"===e.trim()}(r))&&n.preventDefault(),t?n.stopPropagation():null==a||a(n)};return"a"===e&&(r||(r="#"),t&&(r=void 0)),[{role:"button",disabled:void 0,tabIndex:t?void 0:l,href:r,target:"a"===e?n:void 0,"aria-disabled":t||void 0,rel:"a"===e?o:void 0,onClick:f,onKeyDown:e=>{" "===e.key&&(e.preventDefault(),f(e))}},i]}const f=a.forwardRef(((e,t)=>{let{as:r,disabled:n}=e,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,u);const[a,{tagName:f}]=i(Object.assign({tagName:r,disabled:n},o));return(0,l.jsx)(f,Object.assign({},o,a,{ref:t}))}));f.displayName="Button";var c=r(6792);const s=a.forwardRef((({as:e,bsPrefix:t,variant:r,size:n,active:a,className:u,...f},s)=>{const d=(0,c.vE)(t,"btn"),[p,{tagName:v}]=i({tagName:e,...f}),y=v;return(0,l.jsx)(y,{...p,...f,ref:s,className:o()(u,d,a&&"active",r&&`${d}-${r}`,n&&`${d}-${n}`,f.href&&f.disabled&&"disabled")})}));s.displayName="Button",s.defaultProps={variant:"primary",active:!1,disabled:!1};var d=s}}]);