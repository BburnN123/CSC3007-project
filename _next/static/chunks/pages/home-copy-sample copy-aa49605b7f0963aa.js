(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[881],{1744:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home-copy-sample copy",function(){return n(6482)}])},5415:function(t,e,n){"use strict";var r=n(4051),o=n.n(r),c=n(5893),a=n(9547),i=n.n(a),s=n(7294),u=n(404),f=n(9669),l=n.n(f);function p(t,e,n,r,o,c,a){try{var i=t[c](a),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(r,o)}function d(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t,e){return!e||"object"!==x(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var x=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function v(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return y(this,n)}}var g=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(n,t);var e=v(n);function n(){var t;return d(this,n),(t=e.apply(this,arguments)).drawMap=function(e){var n=t.props,r=n.drawGraticules,o=n.enableRotation;if(!(u.Ys("#ctn-map").select("svg").size()>0)){u.Ys("#ctn-map").append("svg").attr("viewBox","0 0 800 500").attr("preserveAspectRatio","xMidYMid meet");var c=t.getProjection(),a=u.l49().projection(c);t.colourOcean(a),t.drawCountries(e,a),r&&t.drawGraticules(a),o&&t.enhableRotation(c,a)}},t.colourOcean=function(t){var e=u.Ys("#ctn-map").select("svg"),n=e.append("defs").append("linearGradient").attr("id","oceanGradient").attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","0%");n.append("stop").attr("offset","0%").style("stop-color","rgb(0,0,27)").style("stop-opacity",1),n.append("stop").attr("offset","100%").style("stop-color","rgb(51,122,183)").style("stop-opacity",1),e.append("path").datum({type:"Sphere"}).attr("id","ocean").attr("d",t).attr("fill","url(#oceanGradient)")},t.drawGraticules=function(t){var e=u.Ys("#ctn-map").select("svg"),n=u.SaU().step([10,10]);e.append("g").attr("id","graticules").selectAll("path").data([n()]).enter().append("path").attr("d",(function(e){return t(e)})).attr("fill","none").attr("stroke","#aaa").attr("stroke-width",.2)},t.drawCountries=function(t,e){var n=u.Ys("#ctn-map").select("svg"),r=n.append("defs").append("linearGradient").attr("id","earthGradient").attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","0%");r.append("stop").attr("offset","0%").style("stop-color","#074C00").style("stop-opacity",1),r.append("stop").attr("offset","100%").style("stop-color","#B8E2A3").style("stop-opacity",1),n.append("g").attr("id","countries").selectAll("path").data(t.features).enter().append("path").attr("d",(function(t){return e(t)})).on("mouseover",(function(t,e){u.Ys(t.currentTarget).classed("selected",!0)})).on("mouseout",(function(t,e){u.Ys(".tooltip").text(""),u.Ys(t.currentTarget).classed("selected",!1)})).attr("fill","#42A341")},t.enhableRotation=function(t,e){var n=u.Ys("#ctn-map").select("svg"),r=.009,o=0,c=0;u.HTH((function(a){t.rotate([r*a-120,o,c]),n.selectAll("path").attr("d",e)}))},t.getProjection=function(){var e=t.props.type,n=u.WvA();switch(e){case"globe":n=u.WvA();break;case"map":n=u.ESh()}return n},t}var r=n.prototype;return r.componentDidMount=function(){var t,e=this;return(t=o().mark((function t(){var n,r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l().get("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");case 2:n=t.sent,r=n.data,e.drawMap(r);case 5:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var c=t.apply(e,n);function a(t){p(c,r,o,a,i,"next",t)}function i(t){p(c,r,o,a,i,"throw",t)}a(void 0)}))})()},r.render=function(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(i(),{id:"cb40cfbd29ee8161",children:".tooltip.jsx-cb40cfbd29ee8161{position:absolute;background:rgb(0,0,0,.6);color:#fff;curosr:pointer width:20px;padding:20px;opacity:0}"}),(0,c.jsx)("div",{id:"ctn-map",className:"jsx-cb40cfbd29ee8161"})]})},n}(s.PureComponent);e.Z=g},4974:function(t,e,n){"use strict";var r=n(5893),o=n(9547),c=n.n(o),a=n(7294);function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return!e||"object"!==l(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function p(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=s(t);if(e){var o=s(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}var d=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(n,t);var e=p(n);function n(){return i(this,n),e.apply(this,arguments)}return n.prototype.render=function(){var t=this.props.type||"body",e=this.props.color||"black",n=this.props.fontweight||"light",o=this.props.textAlign?"text-".concat(this.props.textAlign):"",a=this.props.justify?"align-item-".concat(this.props.justify):"",i="".concat(o," ").concat(a).trim();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c(),{id:"44ad540110ebae4c",children:".xxl-heading.jsx-44ad540110ebae4c{font-size:60px;font-weight:700;line-height:60px}.hero-heading.jsx-44ad540110ebae4c{font-size:40px;font-weight:700;line-height:55px}.heading.jsx-44ad540110ebae4c{font-size:32px;font-weight:500;line-height:22px}.sub-heading.jsx-44ad540110ebae4c{font-size:28px}.title.jsx-44ad540110ebae4c{font-size:24px;line-height:1.6}.sub-title.jsx-44ad540110ebae4c{font-size:18px;line-height:1.6}.body.jsx-44ad540110ebae4c{font-size:16px;line-height:1.6}.light.jsx-44ad540110ebae4c{font-weight:300}.bold.jsx-44ad540110ebae4c{font-weight:500}.bolder.jsx-44ad540110ebae4c{font-weight:900}.white.jsx-44ad540110ebae4c{color:#fff}.black.jsx-44ad540110ebae4c{color:#000}.error.jsx-44ad540110ebae4c{color:#dd2c00}.warning.jsx-44ad540110ebae4c{color:#fc0}.blue.jsx-44ad540110ebae4c{color:#6cdae9}.text-center.jsx-44ad540110ebae4c{text-align:center}.text-left.jsx-44ad540110ebae4c{text-align:left}.text-right.jsx-44ad540110ebae4c{text-align:left}.text-justify.jsx-44ad540110ebae4c{text-align:justify}"}),(0,r.jsx)("div",{className:"jsx-44ad540110ebae4c "+"txt-content ".concat(i),children:(0,r.jsx)("span",{className:"jsx-44ad540110ebae4c "+"".concat(t," ").concat(e," ").concat(n),children:this.props.children})})]})},n}(a.PureComponent);e.Z=d},6482:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return E}});var r=n(5893),o=n(9547),c=n.n(o),a=n(7294),i=n(1608),s=n(1555),u=n(5415),f=n(4974),l=n(4051),p=n.n(l);function d(t,e,n,r,o,c,a){try{var i=t[c](a),s=i.value}catch(u){return void n(u)}i.done?e(s):Promise.resolve(s).then(r,o)}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function y(t,e){return!e||"object"!==x(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var x=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function v(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h(t);if(e){var o=h(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return y(this,n)}}var g=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(n,t);var e=v(n);function n(t){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),(r=e.call(this,t)).animateText=function(){var t=r.props.interval||700,e=r.state.counter,n=r.props.words;setTimeout((function(){(e+=1)>=n.length&&(e=0),r.setState({counter:e,text:n[e]})}),t)},r.state={counter:0,text:""},r}var o=n.prototype;return o.componentDidMount=function(){var t,e=this;return(t=p().mark((function t(){return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.setState({text:e.props.words[0]});case 1:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,o){var c=t.apply(e,n);function a(t){d(c,r,o,a,i,"next",t)}function i(t){d(c,r,o,a,i,"throw",t)}a(void 0)}))})()},o.render=function(){return this.animateText(),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c(),{id:"4478cd6ce98005fc",children:"#changeTextContainer.jsx-4478cd6ce98005fc{-webkit-transition:opacity 400ms;-moz-transition:opacity 400ms;-o-transition:opacity 400ms;transition:opacity 400ms}.ctn-reveal.jsx-4478cd6ce98005fc{position:relative;-webkit-transform:translateY(150px);-moz-transform:translateY(150px);-ms-transform:translateY(150px);-o-transform:translateY(150px);transform:translateY(150px);opacity:0;-webkit-transition:all 2s ease;-moz-transition:all 2s ease;-o-transition:all 2s ease;transition:all 2s ease}.ctn-reveal.active.jsx-4478cd6ce98005fc{-webkit-transform:translateY(0px);-moz-transform:translateY(0px);-ms-transform:translateY(0px);-o-transform:translateY(0px);transform:translateY(0px);opacity:1}"}),(0,r.jsx)("div",{id:"changeTextContainer",className:"jsx-4478cd6ce98005fc",children:(0,r.jsx)(f.Z,{type:"xxl-heading",color:"white",fontweight:"bold",children:(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:this.state.text},className:"jsx-4478cd6ce98005fc"})})})]})},n}(a.PureComponent),m=g;function j(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function w(t){return(w=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function _(t,e){return!e||"object"!==P(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function O(t,e){return(O=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var P=function(t){return t&&"undefined"!==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function R(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=w(t);if(e){var o=w(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return _(this,n)}}var k=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&O(t,e)}(n,t);var e=R(n);function n(){return j(this,n),e.apply(this,arguments)}return n.prototype.render=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c(),{id:"23c88643a6760129",children:'.ctn-home.jsx-23c88643a6760129{display:grid;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;height:100vh;margin:auto;background-image:url("/image/bg-img.jpg");background-repeat:no-repeat;-webkit-background-size:cover;-moz-background-size:cover;-o-background-size:cover;background-size:cover;overflow:hidden}'}),(0,r.jsx)("div",{className:"jsx-23c88643a6760129 ctn-home",children:(0,r.jsxs)(i.Z,{className:"align-items-center justify-content-center",children:[(0,r.jsx)(s.Z,{lg:7,children:(0,r.jsx)(u.Z,{type:"globe",drawGraticules:!1,enableRotation:!0})}),(0,r.jsxs)(s.Z,{lg:5,children:[(0,r.jsx)(m,{words:["CO<sub>2</sub> Gashouse <br/> Emission","Human Activities"]}),(0,r.jsx)(f.Z,{type:"xxl-heading",color:"white",fontweight:"bold"})]})]})})]})},n}(a.PureComponent),E=k}},function(t){t.O(0,[428,774,888,179],(function(){return e=1744,t(t.s=e);var e}));var e=t.O();_N_E=e}]);