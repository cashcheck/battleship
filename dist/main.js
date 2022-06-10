(()=>{"use strict";var t={426:(t,e,n)=>{n.d(e,{Z:()=>c});var r=n(81),o=n.n(r),i=n(645),a=n.n(i)()(o());a.push([t.id,"\n.cell-content {\n    width: 28px;\n    height: 28px;\n    background-color: lightgray;\n}\n\n.cell-content.active {\n    background-color: darkgray;\n}\n\n.cell-content:hover {\n    background-color: white;\n}\n\n.drag {\n    border: 2px solid black;\n    width: 28px;\n    height: 60px;\n    position: absolute !important;\n    z-index: 2;\n    margin: -2px;\n    background-color: lightsteelblue;\n}\n\n.drag:hover {\n    cursor: grab;\n}\n\ntable {\n    margin: 50px auto 0 auto;\n    border-collapse: collapse;\n}\n\ntd {\n    border: 1px solid;\n}",""]);const c=a},645:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,o,i){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(a[s]=!0)}for(var l=0;l<t.length;l++){var u=[].concat(t[l]);r&&a[u[0]]||(void 0!==i&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=i),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),e.push(u))}},e}},81:t=>{t.exports=function(t){return t[1]}},379:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var i={},a=[],c=0;c<t.length;c++){var s=t[c],l=r.base?s[0]+r.base:s[0],u=i[l]||0,p="".concat(l," ").concat(u);i[l]=u+1;var d=n(p),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==d)e[d].references++,e[d].updater(f);else{var h=o(f,r);r.byIndex=c,e.splice(c,0,{identifier:p,updater:h,references:1})}a.push(p)}return a}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var i=r(t=t||[],o=o||{});return function(t){t=t||[];for(var a=0;a<i.length;a++){var c=n(i[a]);e[c].references--}for(var s=r(t,o),l=0;l<i.length;l++){var u=n(i[l]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}i=s}}},569:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{t.exports=function(t){var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={id:r,exports:{}};return t[r](i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{function t(t){return Math.floor(Math.random()*t)}function e(e,n){return[t(e),t(n)]}function r(t,e){let n=[];const r=Math.abs(t[0]-e[0]+t[1]-e[1])+1;let o=function(t,e){const n=[];if(1==r)return[t];if(t[0]==e[0])if(t[1]>e[1])for(let r=e[1];r<=t[1];r++)n.push([t[0],r]);else for(let r=t[1];r<=e[1];r++)n.push([t[0],r]);else if(t[0]>e[0])for(let r=e[0];r<=t[0];r++)n.push([r,t[1]]);else for(let r=t[0];r<=e[0];r++)n.push([r,t[1]]);return n}(t,e);return{length:r,hitPoints:o,hits:n,isSunk:function(){return n.length==r},hit:function(t){const e=t.toString();for(let r=0;r<o.length;r++)if(o[r].toString()==e)return n.push(t),!0;return!1}}}function o(){let n=[],o=[],i=[],a=[];function c(t,n){if(0==n){const n=e(9-t,9),o=[];return o.push(n[0]+t-1),o.push(n[1]),r(n,o)}const o=e(9,9-t),i=[];return i.push(o[0]),i.push(o[1]+t-1),r(o,i)}function s(t){for(let e=0;e<t.length;e++)if(o.some((n=>n.toString()==t.hitPoints[e].toString())))return!1;return!0}function l(t){t.hitPoints.forEach((t=>{o.push(t)})),n.push(t)}function u(t){s(t)&&l(t)}return{ships:n,shipsC:o,hits:a,misses:i,placeShip:l,checkShip:s,placeValidShip:u,randomShip:c,nRandomShips:function(e,r){const o=n.length+e;for(;n.length<o;)u(c(r,t(2)))},sunkAll:function(){return a.length==o.length},receiveAttack:function(t){for(let e=0;e<n.length;e++)if(n[e].hit(t))return void a.push(t);i.push(t)}}}document.querySelectorAll(".cell-content").forEach((t=>{t.addEventListener("click",(e=>{console.log([t.getAttribute("x"),t.getAttribute("y")])}))}));const i=o();for(;i.ships.length<2;){let t=i.randomShip(4,0);i.placeValidShip(t)}var a=n(379),c=n.n(a),s=n(795),l=n.n(s),u=n(569),p=n.n(u),d=n(565),f=n.n(d),h=n(216),v=n.n(h),g=n(589),m=n.n(g),y=n(426),b={};b.styleTagTransform=m(),b.setAttributes=f(),b.insert=p().bind(null,"head"),b.domAPI=l(),b.insertStyleElement=v(),c()(y.Z,b),y.Z&&y.Z.locals&&y.Z.locals,document.querySelectorAll(".cell-content").forEach((t=>{t.addEventListener("click",(e=>{console.log([t.getAttribute("x"),t.getAttribute("y")])}))}));const x=o();x.nRandomShips(2,4),x.nRandomShips(3,3),x.shipsC.forEach((t=>{let e=t[0],n=t[1];document.querySelector(`[x='${e}'][y='${n}']`).classList.add("active")})),function(){let t=null;document.addEventListener("dragstart",(e=>{t=e.target})),document.addEventListener("dragover",(t=>{t.preventDefault()})),document.addEventListener("drop",(e=>{e.preventDefault(),"cell-content"==e.target.className&&(t.parentNode.removeChild(t),e.target.appendChild(t))}))}(),console.log(x)})()})();