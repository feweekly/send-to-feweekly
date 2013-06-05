
(function(a){String.prototype.trim===a&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),Array.prototype.reduce===a&&(Array.prototype.reduce=function(b){if(this===void 0||this===null)throw new TypeError;var c=Object(this),d=c.length>>>0,e=0,f;if(typeof b!="function")throw new TypeError;if(d==0&&arguments.length==1)throw new TypeError;if(arguments.length>=2)f=arguments[1];else do{if(e in c){f=c[e++];break}if(++e>=d)throw new TypeError}while(!0);while(e<d)e in c&&(f=b.call(a,f,c[e],e,c)),e++;return f})})();var Zepto=function(){function E(a){return a==null?String(a):y[z.call(a)]||"object"}function F(a){return E(a)=="function"}function G(a){return a!=null&&a==a.window}function H(a){return a!=null&&a.nodeType==a.DOCUMENT_NODE}function I(a){return E(a)=="object"}function J(a){return I(a)&&!G(a)&&a.__proto__==Object.prototype}function K(a){return a instanceof Array}function L(a){return typeof a.length=="number"}function M(a){return g.call(a,function(a){return a!=null})}function N(a){return a.length>0?c.fn.concat.apply([],a):a}function O(a){return a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function P(a){return a in j?j[a]:j[a]=new RegExp("(^|\\s)"+a+"(\\s|$)")}function Q(a,b){return typeof b=="number"&&!l[O(a)]?b+"px":b}function R(a){var b,c;return i[a]||(b=h.createElement(a),h.body.appendChild(b),c=k(b,"").getPropertyValue("display"),b.parentNode.removeChild(b),c=="none"&&(c="block"),i[a]=c),i[a]}function S(a){return"children"in a?f.call(a.children):c.map(a.childNodes,function(a){if(a.nodeType==1)return a})}function T(c,d,e){for(b in d)e&&(J(d[b])||K(d[b]))?(J(d[b])&&!J(c[b])&&(c[b]={}),K(d[b])&&!K(c[b])&&(c[b]=[]),T(c[b],d[b],e)):d[b]!==a&&(c[b]=d[b])}function U(b,d){return d===a?c(b):c(b).filter(d)}function V(a,b,c,d){return F(b)?b.call(a,c,d):b}function W(a,b,c){c==null?a.removeAttribute(b):a.setAttribute(b,c)}function X(b,c){var d=b.className,e=d&&d.baseVal!==a;if(c===a)return e?d.baseVal:d;e?d.baseVal=c:b.className=c}function Y(a){var b;try{return a?a=="true"||(a=="false"?!1:a=="null"?null:isNaN(b=Number(a))?/^[\[\{]/.test(a)?c.parseJSON(a):a:b):a}catch(d){return a}}function Z(a,b){b(a);for(var c in a.childNodes)Z(a.childNodes[c],b)}var a,b,c,d,e=[],f=e.slice,g=e.filter,h=window.document,i={},j={},k=h.defaultView.getComputedStyle,l={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},m=/^\s*<(\w+|!)[^>]*>/,n=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,o=/^(?:body|html)$/i,p=["val","css","html","text","data","width","height","offset"],q=["after","prepend","before","append"],r=h.createElement("table"),s=h.createElement("tr"),t={tr:h.createElement("tbody"),tbody:r,thead:r,tfoot:r,td:s,th:s,"*":h.createElement("div")},u=/complete|loaded|interactive/,v=/^\.([\w-]+)$/,w=/^#([\w-]*)$/,x=/^[\w-]+$/,y={},z=y.toString,A={},B,C,D=h.createElement("div");return A.matches=function(a,b){if(!a||a.nodeType!==1)return!1;var c=a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.matchesSelector;if(c)return c.call(a,b);var d,e=a.parentNode,f=!e;return f&&(e=D).appendChild(a),d=~A.qsa(e,b).indexOf(a),f&&D.removeChild(a),d},B=function(a){return a.replace(/-+(.)?/g,function(a,b){return b?b.toUpperCase():""})},C=function(a){return g.call(a,function(b,c){return a.indexOf(b)==c})},A.fragment=function(b,d,e){b.replace&&(b=b.replace(n,"<$1></$2>")),d===a&&(d=m.test(b)&&RegExp.$1),d in t||(d="*");var g,h,i=t[d];return i.innerHTML=""+b,h=c.each(f.call(i.childNodes),function(){i.removeChild(this)}),J(e)&&(g=c(h),c.each(e,function(a,b){p.indexOf(a)>-1?g[a](b):g.attr(a,b)})),h},A.Z=function(a,b){return a=a||[],a.__proto__=c.fn,a.selector=b||"",a},A.isZ=function(a){return a instanceof A.Z},A.init=function(b,d){if(!b)return A.Z();if(F(b))return c(h).ready(b);if(A.isZ(b))return b;var e;if(K(b))e=M(b);else if(I(b))e=[J(b)?c.extend({},b):b],b=null;else if(m.test(b))e=A.fragment(b.trim(),RegExp.$1,d),b=null;else{if(d!==a)return c(d).find(b);e=A.qsa(h,b)}return A.Z(e,b)},c=function(a,b){return A.init(a,b)},c.extend=function(a){var b,c=f.call(arguments,1);return typeof a=="boolean"&&(b=a,a=c.shift()),c.forEach(function(c){T(a,c,b)}),a},A.qsa=function(a,b){var c;return H(a)&&w.test(b)?(c=a.getElementById(RegExp.$1))?[c]:[]:a.nodeType!==1&&a.nodeType!==9?[]:f.call(v.test(b)?a.getElementsByClassName(RegExp.$1):x.test(b)?a.getElementsByTagName(b):a.querySelectorAll(b))},c.contains=function(a,b){return a!==b&&a.contains(b)},c.type=E,c.isFunction=F,c.isWindow=G,c.isArray=K,c.isPlainObject=J,c.isEmptyObject=function(a){var b;for(b in a)return!1;return!0},c.inArray=function(a,b,c){return e.indexOf.call(b,a,c)},c.camelCase=B,c.trim=function(a){return a.trim()},c.uuid=0,c.support={},c.expr={},c.map=function(a,b){var c,d=[],e,f;if(L(a))for(e=0;e<a.length;e++)c=b(a[e],e),c!=null&&d.push(c);else for(f in a)c=b(a[f],f),c!=null&&d.push(c);return N(d)},c.each=function(a,b){var c,d;if(L(a)){for(c=0;c<a.length;c++)if(b.call(a[c],c,a[c])===!1)return a}else for(d in a)if(b.call(a[d],d,a[d])===!1)return a;return a},c.grep=function(a,b){return g.call(a,b)},window.JSON&&(c.parseJSON=JSON.parse),c.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){y["[object "+b+"]"]=b.toLowerCase()}),c.fn={forEach:e.forEach,reduce:e.reduce,push:e.push,sort:e.sort,indexOf:e.indexOf,concat:e.concat,map:function(a){return c(c.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return c(f.apply(this,arguments))},ready:function(a){return u.test(h.readyState)?a(c):h.addEventListener("DOMContentLoaded",function(){a(c)},!1),this},get:function(b){return b===a?f.call(this):this[b>=0?b:b+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){this.parentNode!=null&&this.parentNode.removeChild(this)})},each:function(a){return e.every.call(this,function(b,c){return a.call(b,c,b)!==!1}),this},filter:function(a){return F(a)?this.not(this.not(a)):c(g.call(this,function(b){return A.matches(b,a)}))},add:function(a,b){return c(C(this.concat(c(a,b))))},is:function(a){return this.length>0&&A.matches(this[0],a)},not:function(b){var d=[];if(F(b)&&b.call!==a)this.each(function(a){b.call(this,a)||d.push(this)});else{var e=typeof b=="string"?this.filter(b):L(b)&&F(b.item)?f.call(b):c(b);this.forEach(function(a){e.indexOf(a)<0&&d.push(a)})}return c(d)},has:function(a){return this.filter(function(){return I(a)?c.contains(this,a):c(this).find(a).size()})},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){var a=this[0];return a&&!I(a)?a:c(a)},last:function(){var a=this[this.length-1];return a&&!I(a)?a:c(a)},find:function(a){var b,d=this;return typeof a=="object"?b=c(a).filter(function(){var a=this;return e.some.call(d,function(b){return c.contains(b,a)})}):this.length==1?b=c(A.qsa(this[0],a)):b=this.map(function(){return A.qsa(this,a)}),b},closest:function(a,b){var d=this[0],e=!1;typeof a=="object"&&(e=c(a));while(d&&!(e?e.indexOf(d)>=0:A.matches(d,a)))d=d!==b&&!H(d)&&d.parentNode;return c(d)},parents:function(a){var b=[],d=this;while(d.length>0)d=c.map(d,function(a){if((a=a.parentNode)&&!H(a)&&b.indexOf(a)<0)return b.push(a),a});return U(b,a)},parent:function(a){return U(C(this.pluck("parentNode")),a)},children:function(a){return U(this.map(function(){return S(this)}),a)},contents:function(){return this.map(function(){return f.call(this.childNodes)})},siblings:function(a){return U(this.map(function(a,b){return g.call(S(b.parentNode),function(a){return a!==b})}),a)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(a){return c.map(this,function(b){return b[a]})},show:function(){return this.each(function(){this.style.display=="none"&&(this.style.display=null),k(this,"").getPropertyValue("display")=="none"&&(this.style.display=R(this.nodeName))})},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){var b=F(a);if(this[0]&&!b)var d=c(a).get(0),e=d.parentNode||this.length>1;return this.each(function(f){c(this).wrapAll(b?a.call(this,f):e?d.cloneNode(!0):d)})},wrapAll:function(a){if(this[0]){c(this[0]).before(a=c(a));var b;while((b=a.children()).length)a=b.first();c(a).append(this)}return this},wrapInner:function(a){var b=F(a);return this.each(function(d){var e=c(this),f=e.contents(),g=b?a.call(this,d):a;f.length?f.wrapAll(g):e.append(g)})},unwrap:function(){return this.parent().each(function(){c(this).replaceWith(c(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(b){return this.each(function(){var d=c(this);(b===a?d.css("display")=="none":b)?d.show():d.hide()})},prev:function(a){return c(this.pluck("previousElementSibling")).filter(a||"*")},next:function(a){return c(this.pluck("nextElementSibling")).filter(a||"*")},html:function(b){return b===a?this.length>0?this[0].innerHTML:null:this.each(function(a){var d=this.innerHTML;c(this).empty().append(V(this,b,a,d))})},text:function(b){return b===a?this.length>0?this[0].textContent:null:this.each(function(){this.textContent=b})},attr:function(c,d){var e;return typeof c=="string"&&d===a?this.length==0||this[0].nodeType!==1?a:c=="value"&&this[0].nodeName=="INPUT"?this.val():!(e=this[0].getAttribute(c))&&c in this[0]?this[0][c]:e:this.each(function(a){if(this.nodeType!==1)return;if(I(c))for(b in c)W(this,b,c[b]);else W(this,c,V(this,d,a,this.getAttribute(c)))})},removeAttr:function(a){return this.each(function(){this.nodeType===1&&W(this,a)})},prop:function(b,c){return c===a?this[0]&&this[0][b]:this.each(function(a){this[b]=V(this,c,a,this[b])})},data:function(b,c){var d=this.attr("data-"+O(b),c);return d!==null?Y(d):a},val:function(b){return b===a?this[0]&&(this[0].multiple?c(this[0]).find("option").filter(function(a){return this.selected}).pluck("value"):this[0].value):this.each(function(a){this.value=V(this,b,a,this.value)})},offset:function(a){if(a)return this.each(function(b){var d=c(this),e=V(this,a,b,d.offset()),f=d.offsetParent().offset(),g={top:e.top-f.top,left:e.left-f.left};d.css("position")=="static"&&(g.position="relative"),d.css(g)});if(this.length==0)return null;var b=this[0].getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset,width:Math.round(b.width),height:Math.round(b.height)}},css:function(a,c){if(arguments.length<2&&typeof a=="string")return this[0]&&(this[0].style[B(a)]||k(this[0],"").getPropertyValue(a));var d="";if(E(a)=="string")!c&&c!==0?this.each(function(){this.style.removeProperty(O(a))}):d=O(a)+":"+Q(a,c);else for(b in a)!a[b]&&a[b]!==0?this.each(function(){this.style.removeProperty(O(b))}):d+=O(b)+":"+Q(b,a[b])+";";return this.each(function(){this.style.cssText+=";"+d})},index:function(a){return a?this.indexOf(c(a)[0]):this.parent().children().indexOf(this[0])},hasClass:function(a){return e.some.call(this,function(a){return this.test(X(a))},P(a))},addClass:function(a){return this.each(function(b){d=[];var e=X(this),f=V(this,a,b,e);f.split(/\s+/g).forEach(function(a){c(this).hasClass(a)||d.push(a)},this),d.length&&X(this,e+(e?" ":"")+d.join(" "))})},removeClass:function(b){return this.each(function(c){if(b===a)return X(this,"");d=X(this),V(this,b,c,d).split(/\s+/g).forEach(function(a){d=d.replace(P(a)," ")}),X(this,d.trim())})},toggleClass:function(b,d){return this.each(function(e){var f=c(this),g=V(this,b,e,X(this));g.split(/\s+/g).forEach(function(b){(d===a?!f.hasClass(b):d)?f.addClass(b):f.removeClass(b)})})},scrollTop:function(){if(!this.length)return;return"scrollTop"in this[0]?this[0].scrollTop:this[0].scrollY},position:function(){if(!this.length)return;var a=this[0],b=this.offsetParent(),d=this.offset(),e=o.test(b[0].nodeName)?{top:0,left:0}:b.offset();return d.top-=parseFloat(c(a).css("margin-top"))||0,d.left-=parseFloat(c(a).css("margin-left"))||0,e.top+=parseFloat(c(b[0]).css("border-top-width"))||0,e.left+=parseFloat(c(b[0]).css("border-left-width"))||0,{top:d.top-e.top,left:d.left-e.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||h.body;while(a&&!o.test(a.nodeName)&&c(a).css("position")=="static")a=a.offsetParent;return a})}},c.fn.detach=c.fn.remove,["width","height"].forEach(function(b){c.fn[b]=function(d){var e,f=this[0],g=b.replace(/./,function(a){return a[0].toUpperCase()});return d===a?G(f)?f["inner"+g]:H(f)?f.documentElement["offset"+g]:(e=this.offset())&&e[b]:this.each(function(a){f=c(this),f.css(b,V(this,d,a,f[b]()))})}}),q.forEach(function(a,b){var d=b%2;c.fn[a]=function(){var a,e=c.map(arguments,function(b){return a=E(b),a=="object"||a=="array"||b==null?b:A.fragment(b)}),f,g=this.length>1;return e.length<1?this:this.each(function(a,h){f=d?h:h.parentNode,h=b==0?h.nextSibling:b==1?h.firstChild:b==2?h:null,e.forEach(function(a){if(g)a=a.cloneNode(!0);else if(!f)return c(a).remove();Z(f.insertBefore(a,h),function(a){a.nodeName!=null&&a.nodeName.toUpperCase()==="SCRIPT"&&(!a.type||a.type==="text/javascript")&&!a.src&&window.eval.call(window,a.innerHTML)})})})},c.fn[d?a+"To":"insert"+(b?"Before":"After")]=function(b){return c(b)[a](this),this}}),A.Z.prototype=c.fn,A.uniq=C,A.deserializeValue=Y,c.zepto=A,c}();window.Zepto=Zepto,"$"in window||(window.$=Zepto),function(a){function b(a){var b=this.os={},c=this.browser={},d=a.match(/WebKit\/([\d.]+)/),e=a.match(/(Android)\s+([\d.]+)/),f=a.match(/(iPad).*OS\s([\d_]+)/),g=!f&&a.match(/(iPhone\sOS)\s([\d_]+)/),h=a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),i=h&&a.match(/TouchPad/),j=a.match(/Kindle\/([\d.]+)/),k=a.match(/Silk\/([\d._]+)/),l=a.match(/(BlackBerry).*Version\/([\d.]+)/),m=a.match(/(BB10).*Version\/([\d.]+)/),n=a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),o=a.match(/PlayBook/),p=a.match(/Chrome\/([\d.]+)/)||a.match(/CriOS\/([\d.]+)/),q=a.match(/Firefox\/([\d.]+)/);if(c.webkit=!!d)c.version=d[1];e&&(b.android=!0,b.version=e[2]),g&&(b.ios=b.iphone=!0,b.version=g[2].replace(/_/g,".")),f&&(b.ios=b.ipad=!0,b.version=f[2].replace(/_/g,".")),h&&(b.webos=!0,b.version=h[2]),i&&(b.touchpad=!0),l&&(b.blackberry=!0,b.version=l[2]),m&&(b.bb10=!0,b.version=m[2]),n&&(b.rimtabletos=!0,b.version=n[2]),o&&(c.playbook=!0),j&&(b.kindle=!0,b.version=j[1]),k&&(c.silk=!0,c.version=k[1]),!k&&b.android&&a.match(/Kindle Fire/)&&(c.silk=!0),p&&(c.chrome=!0,c.version=p[1]),q&&(c.firefox=!0,c.version=q[1]),b.tablet=!!(f||o||e&&!a.match(/Mobile/)||q&&a.match(/Tablet/)),b.phone=!b.tablet&&!!(e||g||h||l||m||p&&a.match(/Android/)||p&&a.match(/CriOS\/([\d.]+)/)||q&&a.match(/Mobile/))}b.call(a,navigator.userAgent),a.__detect=b}(Zepto),function(a){function g(a){return a._zid||(a._zid=d++)}function h(a,b,d,e){b=i(b);if(b.ns)var f=j(b.ns);return(c[g(a)]||[]).filter(function(a){return a&&(!b.e||a.e==b.e)&&(!b.ns||f.test(a.ns))&&(!d||g(a.fn)===g(d))&&(!e||a.sel==e)})}function i(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function j(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function k(b,c,d){a.type(b)!="string"?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function l(a,b){return a.del&&(a.e=="focus"||a.e=="blur")||!!b}function m(a){return f[a]||a}function n(b,d,e,h,j,n){var o=g(b),p=c[o]||(c[o]=[]);k(d,e,function(c,d){var e=i(c);e.fn=d,e.sel=h,e.e in f&&(d=function(b){var c=b.relatedTarget;if(!c||c!==this&&!a.contains(this,c))return e.fn.apply(this,arguments)}),e.del=j&&j(d,c);var g=e.del||d;e.proxy=function(a){var c=g.apply(b,[a].concat(a.data));return c===!1&&(a.preventDefault(),a.stopPropagation()),c},e.i=p.length,p.push(e),b.addEventListener(m(e.e),e.proxy,l(e,n))})}function o(a,b,d,e,f){var i=g(a);k(b||"",d,function(b,d){h(a,b,d,e).forEach(function(b){delete c[i][b.i],a.removeEventListener(m(b.e),b.proxy,l(b,f))})})}function t(b){var c,d={originalEvent:b};for(c in b)!r.test(c)&&b[c]!==undefined&&(d[c]=b[c]);return a.each(s,function(a,c){d[a]=function(){return this[c]=p,b[a].apply(b,arguments)},d[c]=q}),d}function u(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var b=a.zepto.qsa,c={},d=1,e={},f={mouseenter:"mouseover",mouseleave:"mouseout"};e.click=e.mousedown=e.mouseup=e.mousemove="MouseEvents",a.event={add:n,remove:o},a.proxy=function(b,c){if(a.isFunction(b)){var d=function(){return b.apply(c,arguments)};return d._zid=g(b),d}if(typeof c=="string")return a.proxy(b[c],b);throw new TypeError("expected function")},a.fn.bind=function(a,b){return this.each(function(){n(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){o(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){n(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return o(d,b,a),c}})})};var p=function(){return!0},q=function(){return!1},r=/^([A-Z]|layer[XY]$)/,s={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){return this.each(function(e,f){n(f,c,d,b,function(c){return function(d){var e,g=a(d.target).closest(b,f).get(0);if(g)return e=a.extend(t(d),{currentTarget:g,liveFired:f}),c.apply(g,[e].concat([].slice.call(arguments,1)))}})})},a.fn.undelegate=function(a,b,c){return this.each(function(){o(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return!c||a.isFunction(c)?this.bind(b,c||d):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return!c||a.isFunction(c)?this.unbind(b,c||d):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){if(typeof b=="string"||a.isPlainObject(b))b=a.Event(b);return u(b),b.data=c,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,c){var d,e;return this.each(function(f,g){d=t(typeof b=="string"?a.Event(b):b),d.data=c,d.target=g,a.each(h(g,b.type||b),function(a,b){e=b.proxy(d);if(d.isImmediatePropagationStopped())return!1})}),e},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.trigger(b)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){return a?this.bind(b,a):this.each(function(){try{this[b]()}catch(a){}}),this}}),a.Event=function(a,b){typeof a!="string"&&(b=a,a=b.type);var c=document.createEvent(e[a]||"Events"),d=!0;if(b)for(var f in b)f=="bubbles"?d=!!b[f]:c[f]=b[f];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c.isDefaultPrevented=function(){return this.defaultPrevented},c}}(Zepto),function($){function triggerAndReturn(a,b,c){var d=$.Event(b);return $(a).trigger(d,c),!d.defaultPrevented}function triggerGlobal(a,b,c,d){if(a.global)return triggerAndReturn(b||document,c,d)}function ajaxStart(a){a.global&&$.active++===0&&triggerGlobal(a,null,"ajaxStart")}function ajaxStop(a){a.global&&!--$.active&&triggerGlobal(a,null,"ajaxStop")}function ajaxBeforeSend(a,b){var c=b.context;if(b.beforeSend.call(c,a,b)===!1||triggerGlobal(b,c,"ajaxBeforeSend",[a,b])===!1)return!1;triggerGlobal(b,c,"ajaxSend",[a,b])}function ajaxSuccess(a,b,c){var d=c.context,e="success";c.success.call(d,a,e,b),triggerGlobal(c,d,"ajaxSuccess",[b,c,a]),ajaxComplete(e,b,c)}function ajaxError(a,b,c,d){var e=d.context;d.error.call(e,c,b,a),triggerGlobal(d,e,"ajaxError",[c,d,a]),ajaxComplete(b,c,d)}function ajaxComplete(a,b,c){var d=c.context;c.complete.call(d,b,a),triggerGlobal(c,d,"ajaxComplete",[b,c]),ajaxStop(c)}function empty(){}function mimeToDataType(a){return a&&(a=a.split(";",2)[0]),a&&(a==htmlType?"html":a==jsonType?"json":scriptTypeRE.test(a)?"script":xmlTypeRE.test(a)&&"xml")||"text"}function appendQuery(a,b){return(a+"&"+b).replace(/[&?]{1,2}/,"?")}function serializeData(a){a.processData&&a.data&&$.type(a.data)!="string"&&(a.data=$.param(a.data,a.traditional)),a.data&&(!a.type||a.type.toUpperCase()=="GET")&&(a.url=appendQuery(a.url,a.data))}function parseArguments(a,b,c,d){var e=!$.isFunction(b);return{url:a,data:e?b:undefined,success:e?$.isFunction(c)?c:undefined:b,dataType:e?d||c:c}}function serialize(a,b,c,d){var e,f=$.isArray(b);$.each(b,function(b,g){e=$.type(g),d&&(b=c?d:d+"["+(f?"":b)+"]"),!d&&f?a.add(g.name,g.value):e=="array"||!c&&e=="object"?serialize(a,g,c,b):a.add(b,g)})}var jsonpID=0,document=window.document,key,name,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,scriptTypeRE=/^(?:text|application)\/javascript/i,xmlTypeRE=/^(?:text|application)\/xml/i,jsonType="application/json",htmlType="text/html",blankRE=/^\s*$/;$.active=0,$.ajaxJSONP=function(a){if("type"in a){var b="jsonp"+ ++jsonpID,c=document.createElement("script"),d=function(){clearTimeout(g),$(c).remove(),delete window[b]},e=function(c){d();if(!c||c=="timeout")window[b]=empty;ajaxError(null,c||"abort",f,a)},f={abort:e},g;return ajaxBeforeSend(f,a)===!1?(e("abort"),!1):(window[b]=function(b){d(),ajaxSuccess(b,f,a)},c.onerror=function(){e("error")},c.src=a.url.replace(/=\?/,"="+b),$("head").append(c),a.timeout>0&&(g=setTimeout(function(){e("timeout")},a.timeout)),f)}return $.ajax(a)},$.ajaxSettings={type:"GET",beforeSend:empty,success:empty,error:empty,complete:empty,context:null,global:!0,xhr:function(){return new window.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript",json:jsonType,xml:"application/xml, text/xml",html:htmlType,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0},$.ajax=function(options){var settings=$.extend({},options||{});for(key in $.ajaxSettings)settings[key]===undefined&&(settings[key]=$.ajaxSettings[key]);ajaxStart(settings),settings.crossDomain||(settings.crossDomain=/^([\w-]+:)?\/\/([^\/]+)/.test(settings.url)&&RegExp.$2!=window.location.host),settings.url||(settings.url=window.location.toString()),serializeData(settings),settings.cache===!1&&(settings.url=appendQuery(settings.url,"_="+Date.now()));var dataType=settings.dataType,hasPlaceholder=/=\?/.test(settings.url);if(dataType=="jsonp"||hasPlaceholder)return hasPlaceholder||(settings.url=appendQuery(settings.url,"callback=?")),$.ajaxJSONP(settings);var mime=settings.accepts[dataType],baseHeaders={},protocol=/^([\w-]+:)\/\//.test(settings.url)?RegExp.$1:window.location.protocol,xhr=settings.xhr(),abortTimeout;settings.crossDomain||(baseHeaders["X-Requested-With"]="XMLHttpRequest"),mime&&(baseHeaders.Accept=mime,mime.indexOf(",")>-1&&(mime=mime.split(",",2)[0]),xhr.overrideMimeType&&xhr.overrideMimeType(mime));if(settings.contentType||settings.contentType!==!1&&settings.data&&settings.type.toUpperCase()!="GET")baseHeaders["Content-Type"]=settings.contentType||"application/x-www-form-urlencoded";settings.headers=$.extend(baseHeaders,settings.headers||{}),xhr.onreadystatechange=function(){if(xhr.readyState==4){xhr.onreadystatechange=empty,clearTimeout(abortTimeout);var result,error=!1;if(xhr.status>=200&&xhr.status<300||xhr.status==304||xhr.status==0&&protocol=="file:"){dataType=dataType||mimeToDataType(xhr.getResponseHeader("content-type")),result=xhr.responseText;try{dataType=="script"?(1,eval)(result):dataType=="xml"?result=xhr.responseXML:dataType=="json"&&(result=blankRE.test(result)?null:$.parseJSON(result))}catch(e){error=e}error?ajaxError(error,"parsererror",xhr,settings):ajaxSuccess(result,xhr,settings)}else ajaxError(null,xhr.status?"error":"abort",xhr,settings)}};var async="async"in settings?settings.async:!0;xhr.open(settings.type,settings.url,async);for(name in settings.headers)xhr.setRequestHeader(name,settings.headers[name]);return ajaxBeforeSend(xhr,settings)===!1?(xhr.abort(),!1):(settings.timeout>0&&(abortTimeout=setTimeout(function(){xhr.onreadystatechange=empty,xhr.abort(),ajaxError(null,"timeout",xhr,settings)},settings.timeout)),xhr.send(settings.data?settings.data:null),xhr)},$.get=function(a,b,c,d){return $.ajax(parseArguments.apply(null,arguments))},$.post=function(a,b,c,d){var e=parseArguments.apply(null,arguments);return e.type="POST",$.ajax(e)},$.getJSON=function(a,b,c){var d=parseArguments.apply(null,arguments);return d.dataType="json",$.ajax(d)},$.fn.load=function(a,b,c){if(!this.length)return this;var d=this,e=a.split(/\s/),f,g=parseArguments(a,b,c),h=g.success;return e.length>1&&(g.url=e[0],f=e[1]),g.success=function(a){d.html(f?$("<div>").html(a.replace(rscript,"")).find(f):a),h&&h.apply(d,arguments)},$.ajax(g),this};var escape=encodeURIComponent;$.param=function(a,b){var c=[];return c.add=function(a,b){this.push(escape(a)+"="+escape(b))},serialize(c,a,b),c.join("&").replace(/%20/g,"+")}}(Zepto),function(a){a.fn.serializeArray=function(){var b=[],c;return a(Array.prototype.slice.call(this.get(0).elements)).each(function(){c=a(this);var d=c.attr("type");this.nodeName.toLowerCase()!="fieldset"&&!this.disabled&&d!="submit"&&d!="reset"&&d!="button"&&(d!="radio"&&d!="checkbox"||this.checked)&&b.push({name:c.attr("name"),value:c.val()})}),b},a.fn.serialize=function(){var a=[];return this.serializeArray().forEach(function(b){a.push(encodeURIComponent(b.name)+"="+encodeURIComponent(b.value))}),a.join("&")},a.fn.submit=function(b){if(b)this.bind("submit",b);else if(this.length){var c=a.Event("submit");this.eq(0).trigger(c),c.defaultPrevented||this.get(0).submit()}return this}}(Zepto),function(a,b){function s(a){return t(a.replace(/([a-z])([A-Z])/,"$1-$2"))}function t(a){return a.toLowerCase()}function u(a){return d?d+a:t(a)}var c="",d,e,f,g={Webkit:"webkit",Moz:"",O:"o",ms:"MS"},h=window.document,i=h.createElement("div"),j=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,k,l,m,n,o,p,q,r={};a.each(g,function(a,e){if(i.style[a+"TransitionProperty"]!==b)return c="-"+t(a)+"-",d=e,!1}),k=c+"transform",r[l=c+"transition-property"]=r[m=c+"transition-duration"]=r[n=c+"transition-timing-function"]=r[o=c+"animation-name"]=r[p=c+"animation-duration"]=r[q=c+"animation-timing-function"]="",a.fx={off:d===b&&i.style.transitionProperty===b,speeds:{_default:400,fast:200,slow:600},cssPrefix:c,transitionEnd:u("TransitionEnd"),animationEnd:u("AnimationEnd")},a.fn.animate=function(b,c,d,e){return a.isPlainObject(c)&&(d=c.easing,e=c.complete,c=c.duration),c&&(c=(typeof c=="number"?c:a.fx.speeds[c]||a.fx.speeds._default)/1e3),this.anim(b,c,d,e)},a.fn.anim=function(c,d,e,f){var g,h={},i,t="",u=this,v,w=a.fx.transitionEnd;d===b&&(d=.4),a.fx.off&&(d=0);if(typeof c=="string")h[o]=c,h[p]=d+"s",h[q]=e||"linear",w=a.fx.animationEnd;else{i=[];for(g in c)j.test(g)?t+=g+"("+c[g]+") ":(h[g]=c[g],i.push(s(g)));t&&(h[k]=t,i.push(k)),d>0&&typeof c=="object"&&(h[l]=i.join(", "),h[m]=d+"s",h[n]=e||"linear")}return v=function(b){if(typeof b!="undefined"){if(b.target!==b.currentTarget)return;a(b.target).unbind(w,v)}a(this).css(r),f&&f.call(this)},d>0&&this.bind(w,v),this.size()&&this.get(0).clientLeft,this.css(h),d<=0&&setTimeout(function(){u.each(function(){v.call(this)})},0),this},i=null}(Zepto);

if (window.THE_FEWKLY_BM) {
    window.THE_FEWKLY_BM.save();
} else {
    var FEWKLY_D = 'www.feweekly.com';

    /**
     * FEWKLY_BM_OVERLAY is the view itself and contains all of the methods to manipute the overlay and messaging.
     * It does not contain any logic for saving or communication with the extension or server.
     */
    var FEWKLY_BM_OVERLAY = function () {
        this.inited = false;
    };

    FEWKLY_BM_OVERLAY.prototype = {
        create: function () {
            // remove any existing elements
            var existingStyle = document.getElementById('FEWKLY_BM_STYLE');
            if (existingStyle) {
                existingStyle.parentNode.removeChild(existingStyle);
            }

            var existingOverlay = document.getElementById('FEWKLY_BM_OVERLAY');
            if (existingOverlay) {
                existingOverlay.parentNode.removeChild(existingOverlay);
            }

            // figure out how much we need to scale the overlay to match the user's zoom level
            var scale = window.innerWidth / screen.availWidth;
            if (scale < 1) {
                scale = 1;
            }

            var userAgent       = window.navigator.userAgent;
            this.isMobile       = (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));
            this.isSafari       = (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1);

            // overlay values
            // TODO exension image url
            var height          = 80 * scale;
            var fontSize        = 20 * scale;
            var lineHeight      = height;
            var logoSrc         = chrome.extension.getURL('img/Feweekly-Chrome-OptionsLogo.png');

            this.shadowHeight = 20;

            this.itemWasSaved = false;

            // TODO refactor css here
            var styles = '\
            #FEWKLY_BM_OVERLAY\
            {\
                visibility:hidden;\
                position:fixed;\
                top:0px !important;\
                left:0px !important;\
                width:100% !important;\
                height:' + height + 'px;\
                -webkit-box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                -moz-box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                -o-box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                box-shadow:0px 0px ' + this.shadowHeight + 'px rgba(0,0,0,0.4);\
                z-index:2147483647;\
                background: rgb(239,239,239);\
                background: -moz-linear-gradient(top, rgba(239,239,239,0.98) 0%, rgba(253,253,253,0.98) 100%);\
                background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,239,0.98)), color-stop(100%,rgba(253,253,253,0.98)));\
                background: -webkit-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                background: -o-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                background: -ms-linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                background: linear-gradient(top, rgba(239,239,239,0.98) 0%,rgba(253,253,253,0.98) 100%);\
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#efefef\', endColorstr=\'#fdfdfd\',GradientType=0 );\
                border-bottom:1px solid white;\
                font-size:' + fontSize + 'px !important;\
                font-family:HelveticaNeue,Helvetica,Arial !important;\
                line-height:' + lineHeight + 'px !important;\
                text-align: left;\
                color: #4b4b4b !important;\
                -webkit-backface-visibility: hidden;\
                -webkit-perspective: 1000;\
            }\
            #FEWKLY_BM_OVERLAY_LOGO\
            {\
                display: block;\
                width: 225px;\
                height: 75px;\
                float: left;\
                background: url(' + logoSrc + ') left center no-repeat;\
            }\
            #FEWKLY_BM_OVERLAY_WRAPPER\
            {\
                padding-left:7%;\
                padding-right: 7%;\
                height: 100%;\
            }\
            #FEWKLY_BM_OVERLAY_LABEL\
            {\
                text-indent:80px;\
                font-weight:bold;\
            }\
            ';

            // add overlay
            var overlay = '\
            <div id="FEWKLY_BM_OVERLAY">\
                <div id="FEWKLY_BM_OVERLAY_WRAPPER">\
                    <a id="FEWKLY_BM_OVERLAY_LOGO" href="http://' + FEWKLY_D + '" target="_blank"></a>\
                    <div id="FEWKLY_BM_OVERLAY_LABEL"></div>\
                </div>\
            </div>\
            ';

            // add to DOM
            var overlayFakeContainer = document.createElement('div');
            overlayFakeContainer.innerHTML = '<style id="FEWKLY_BM_STYLE">' + styles + '</style>' + overlay;

            var bodys = document.getElementsByTagName('body');
            var body = bodys ? bodys[0] : false;

            if (!body) {
                body = document.documentElement;
            }

            body.appendChild(overlayFakeContainer);

            // animate in
            var self = this;
            setTimeout(function () { self.show(); }, 0);

            this.closeToolbarTime = 3000;
            this.mouseIsOverOverlay = false;
        },

        displayMessage: function (msg) {
            document.getElementById('FEWKLY_BM_OVERLAY_LABEL').innerHTML = msg;
        },

        getReadyToHide: function () {
            var self = this;
            clearTimeout(self.hideTO);
            self.hideTO = setTimeout(function () {
                self.hide();
            }, this.closeToolbarTime);
        },

        cancelPendingHide: function () {
            clearTimeout(this.hideTO);
            this.hideTO = undefined;
        },

        show: function () {
            this.hidesOnClick = false;

            this.cancelPendingHide();

            var overlay = document.getElementById('FEWKLY_BM_OVERLAY');
            overlay.style[this.browserPrefix() + 'Transform'] = 'translate3d(0px,' + (0 - overlay.offsetHeight - this.shadowHeight) + 'px,0px)';
            overlay.style.visibility = 'visible';

            var self = this;
            overlay.onclick = function () {
                if (self.hidesOnClick) {
                    self.hide();
                }
            };

            // Don't hide the notification if the mouse is over the UI
            this.mouseIsOverOverlay = false;

            overlay.onmouseover = function () {
                self.cancelPendingHide();
                self.mouseIsOverOverlay = true;
            };

            overlay.onmouseout = function () {
                self.mouseIsOverOverlay = false;
                if (self.itemWasSaved === false) {
                    return;
                }
                self.closeToolbarTime = 1500;
                self.getReadyToHide();
            };

            setTimeout(function () {
                var prefix = self.browserPrefix();
                overlay.style[prefix + 'Transition'] = '-' + prefix + '-transform 0.3s ease-out';
                overlay.style[prefix + 'Transform'] = 'translate3d(0px,0px,0px)';

                if (self.isSafari) {
                    // Oh Safari ... we cannot have position:fixed and transform, transition
                    // values, because the notification ui will stick at the top of the window
                    // while the user scrolls so we remove it after the slide in animation
                    setTimeout(function () {
                        overlay.style[prefix + 'Transition'] = '';
                        overlay.style[prefix + 'Transform'] = '';
                    }, 300);
                }

            }, 1);
        },

        hide: function () {
            if (this.mouseIsOverOverlay) return;

            var hideDelay = 0.3;

            var overlay = document.getElementById('FEWKLY_BM_OVERLAY');
            var prefix = this.browserPrefix();
            if (this.isSafari) {
                // We removed the Transition style in the show method now we have
                // to readd it
                overlay.style[prefix + 'Transition'] = '-' + prefix + '-transform ' +  hideDelay  + 's ease-out';
            }
            overlay.style[prefix + 'Transform'] = 'translate3d(0px,' + (0 - overlay.offsetHeight - this.shadowHeight) + 'px,0px)';


            setTimeout(function () {
                overlay.style.visibility = 'hidden';
                overlay.parentNode.removeChild(overlay);
            }, hideDelay * 1000);

            if (this.windowResizeHandler && window.removeEventListener) {
                window.removeEventListener("resize", this.windowResizeHandler);
            }
        },

        wasSaved: function () {
            var self = this;
            setTimeout(function () {
                self.itemWasSaved = true;
                self.displayMessage(chrome.i18n.getMessage('infoSaved'));
                self.getReadyToHide();
            }, 30);

        },

        browserPrefix: function () {
            if (this._prefix)
                return this._prefix;

            var el = document.createElement('div');

            var prefixes = ['Webkit', 'Moz', 'MS', 'O'];
            for (var i in prefixes) {
                if (el.style[prefixes[i] + 'Transition'] !== undefined) {
                    this._prefix = prefixes[i];
                    return this._prefix;
                }
            }
        },

        trim: function (str) {
            str = str.replace(/^\s\s*/, '');

            var ws = /\s/,
                i = str.length - 1;

            while (ws.test(str.charAt(i))) {
                i--;
            }

            return str.slice(0, i + 1);
        }

    };


    // Layer between Bookmarklet and Extensions
    var FEWKLY_BM = function () {};

    FEWKLY_BM.prototype = {
        init: function () {
            if (this.inited) {
                return;
            }

            this.overlay = new FEWKLY_BM_OVERLAY();
            this.inited = true;
            this.requestListener = undefined;
        },

        isChrome: function () {
            return window["chrome"] !== undefined && window.chrome.app;
        },

        isSafari: function () {
            return window["safari"] !== undefined;
        },

        addMessageListener: function (listener) {
            // Remove event listener if one is currently registered
            if (this.requestListener !== undefined) {
                this.removeMessageListener();
            }

            // Add request listener
            if (this.isChrome()) {
                this.requestListener = listener;
                chrome.extension.onMessage.addListener(listener);
            } else if (this.isSafari()) {
                this.requestListener = function (thingy) {
                    listener(thingy.message, thingy);
                };
                window.safari.self.addEventListener("message", this.requestListener);
            }
        },

        removeMessageListener: function () {
            if (this.isChrome()) {
                chrome.extension.onMessage.removeListener(this.requestListener);
            } else if (this.isSafari()) {
                window.safari.self.removeEventListener("message", this.requestListener);
            }
            this.requestListener = undefined;
        },

        sendMessage: function (message, cb) {
            if (this.isChrome()) {
                if (window.chrome.extension.sendMessage) {
                    window.chrome.extension.sendMessage(message, cb);
                } else {
                    window.chrome.extension.sendRequest(message, cb);
                }
            } else if (this.isSafari()) {
                // if (cb) {
                //     message["__cbId"] = Callbacker.addCb(cb);
                // }

                safari.self.tab.dispatchMessage("message", message);
            }
        },

        handleMessageResponse: function (response) {
            if (response.status === "success") {
                this.overlay.wasSaved();
            } else if (response.status === "error") {
                // Tried to use a bookmarklet that was created for a different account
                this.overlay.displayMessage("Error!");
                this.overlay.hide();
            }
        },

        save: function () {
            var self = this;

            this.overlay.create();

            if (window.___FEWKLY__URL_TO_SAVE) {
                this.urlToSave = window.___FEWKLY__URL_TO_SAVE;
                window.___FEWKLY__URL_TO_SAVE = undefined;
            }

            if (window.___FEWKLY__URL_SAVED === this.urlToSave) {
                this.overlay.wasSaved();
            } else {
                this.overlay.displayMessage(chrome.i18n.getMessage('infoSaving'));
                this.addMessageListener(function (request) {
                    self.handleMessageResponse(request);
                });
            }
        },

    };

    // make sure the page has fully loaded before trying anything
    window.setTimeout(function () {
        if (!window.THE_FEWKLY_BM) {
            var THE_FEWKLY_BM = new FEWKLY_BM();
            window.THE_FEWKLY_BM = THE_FEWKLY_BM;
            THE_FEWKLY_BM.init();
        }

        window.THE_FEWKLY_BM.save();
        window.THE_FEWKLY_BM.sendMessage({
            action: "ready",
            url: this.urlToSave || window.location.toString()
        }, function () {});

/*jshint camelcase:false */
var results = (function () {
    window.clearly = {};
    window.clearly.debug = true;
    window.clearly.window = window;
    window.clearly.document = window.document;

    return (function (clearly) {

        // debug
        clearly.log = function (message) {
            if (clearly.debug) { console.log(message); }
        };

        // options
        clearly.parsingOptions = {
            '_elements_ignore': '|button|input|select|textarea|optgroup|command|datalist|--|frame|frameset|noframes|--|style|link|script|noscript|--|canvas|applet|map|--|marquee|area|base|',
            '_elements_ignore_tag': '|form|fieldset|details|dir|--|center|font|span|',
            '_elements_self_closing': '|br|hr|--|img|--|col|--|source|--|embed|param|--|iframe|',
            '_elements_visible': '|article|section|--|ul|ol|li|dd|--|table|tr|td|--|div|--|p|--|h1|h2|h3|h4|h5|h6|--|span|',
            '_elements_too_much_content': '|b|i|em|strong|--|h1|h2|h3|h4|h5|--|td|',
            '_elements_container': '|body|--|article|section|--|div|--|td|--|li|--|dd|dt|',
            '_elements_link_density': '|div|--|table|ul|ol|--|section|aside|header|',
            '_elements_floating': '|div|--|table|',
            '_elements_above_target': '|br|--|ul|ol|dl|',
            '_elements_keep_attributes': {
                'a': ['href', 'title', 'name'],
                'img': ['src', 'width', 'height', 'alt', 'title'],
                'video': ['src', 'width', 'height', 'poster', 'audio', 'preload', 'autoplay', 'loop', 'controls'],
                'audio': ['src', 'preload', 'autoplay', 'loop', 'controls'],
                'source': ['src', 'type'],
                'object': ['data', 'type', 'width', 'height', 'classid', 'codebase', 'codetype'],
                'param': ['name', 'value'],
                'embed': ['src', 'type', 'width', 'height', 'flashvars', 'allowscriptaccess', 'allowfullscreen', 'bgcolor'],
                'iframe': ['src', 'width', 'height', 'frameborder', 'scrolling'],
                'td': ['colspan', 'rowspan'],
                'th': ['colspan', 'rowspan']
            }
        };

        // skip links
        clearly.skipStuffFromDomains__links = [
            'doubleclick.net', 'fastclick.net', 'adbrite.com',
            'adbureau.net', 'admob.com', 'bannersxchange.com',
            'buysellads.com', 'impact-ad.jp', 'atdmt.com',
            'advertising.com', 'itmedia.jp', 'microad.jp',
            'serving-sys.com', 'adplan-ds.com'
        ];

        // skip images
        clearly.skipStuffFromDomain__images = [
            'googlesyndication.com', 'fastclick.net', '.2mdn.net',
            'de17a.com', 'content.aimatch.com', 'bannersxchange.com',
            'buysellads.com', 'impact-ad.jp', 'atdmt.com', 'advertising.com',
            'itmedia.jp', 'microad.jp', 'serving-sys.com', 'adplan-ds.com'
        ];

        // keep video
        clearly.keepStuffFromDomain__video = [
            // foreign video sites
            'youtube.com', 'youtube-nocookie.com',
            'vimeo.com', 'hulu.com', 'yahoo.com',
            'flickr.com', 'newsnetz.ch',
            // china video sites
            // @link http://blogunion.org/blogging-tools/china-video-sharing-website-list.html
            '100tv.com', '21gt.com', '51bo.com', '56.com', '5show.com',
            '6rooms.com', '94haokan.com', 'aipaike.com', 'bapo.cn',
            'feesee.com', 'flashmov.com', 'happy3g.com', 'homhow.com',
            'hubotv.com', 'i35mm.cn', 'ivtv.com.cn', 'jiuduo.com',
            'ku6.com', 'letv.com', 'lookev.com', 'maidee.com', 'omytvs.com',
            'openv.tv', 'ouou.com', 'podlook.com', 'pomoho.com', 'qianboo.com',
            'quxiu.com', 'seehaha.com', 'showker.com', 'tudou.com', 'tv.mofile.com',
            'tvix.cn', 'uume.com', 'vkuoo.com', 'vottie.com', 'woaide.com',
            'xmyan.com', 'yoqoo.com', 'youku.com', 'zaguo.com'
        ];

        // measure text
        // asian languages
        // @link http://msdn.microsoft.com/en-us/goglobal/bb688158
        // @link http://en.wikipedia.org/wiki/Japanese_punctuation
        // @link http://en.wikipedia.org/wiki/Japanese_typographic_symbols
        // @link http://unicode.org/charts/PDF/U3000.pdf
        // CJK: Chnese, Japanese, Korean -- HAN character set

        // text length,
        clearly.measureText__getTextLength = function (_the_text) {
            return _the_text.replace(/[\s\n\r]+/gi, '').length;
        };

        // word count,
        clearly.measureText__getWordCount = function (_the_text) {
            var _text = _the_text;
            // do stuff
            _text = _text.replace(/[\s\n\r]+/gi, ' ');
            _text = _text.replace(/([.,?!:;()\[\]'""-])/gi, ' $1 ');
            _text = _text.replace(/([\u3000])/gi, '[=words(1)]');
            _text = _text.replace(/([\u3001])/gi, '[=words(2)]');
            _text = _text.replace(/([\u3002])/gi, '[=words(4)]');
            _text = _text.replace(/([\u301C])/gi, '[=words(2)]');
            _text = _text.replace(/([\u2026|\u2025])/gi, '[=words(2)]');
            _text = _text.replace(/([\u30FB\uFF65])/gi, '[=words(1)]');
            _text = _text.replace(/([\u300C\u300D])/gi, '[=words(1)]');
            _text = _text.replace(/([\u300E\u300F])/gi, '[=words(1)]');
            _text = _text.replace(/([\u3014\u3015])/gi, '[=words(1)]');
            _text = _text.replace(/([\u3008\u3009])/gi, '[=words(1)]');
            _text = _text.replace(/([\u300A\u300B])/gi, '[=words(1)]');
            _text = _text.replace(/([\u3010\u3011])/gi, '[=words(1)]');
            _text = _text.replace(/([\u3016\u3017])/gi, '[=words(1)]');
            _text = _text.replace(/([\u3018\u3019])/gi, '[=words(1)]');
            _text = _text.replace(/([\u301A\u301B])/gi, '[=words(1)]');
            _text = _text.replace(/([\u301D\u301E\u301F])/gi, '[=words(1)]');
            _text = _text.replace(/([\u30A0])/gi, '[=words(1)]');

            // count
            var _count = 0,
                _words_match = _text.match(/([^\s\d]{3,})/gi);

            // add match
            _count += (_words_match !== null ? _words_match.length : 0);

            // add manual count
            _text.replace(/\[=words\((\d)\)\]/, function (_match, _plus) {
                _count += (5 * parseInt(_plus, 10));
            });

            return _count;
        };

        // content
        clearly.getContent = function () {
            clearly.getContent__detectLanguage();
            return clearly.getContent__find();
        };

        // Detect language by randomly selected paragraphs from page
        clearly.getContent__detectLanguage = function () {
            clearly.language = 'general';

            // the text - start with title
            var _test_text = ' ' + clearly.document.title;

            // add couple of random paragraphs, divs
            var _ps = clearly.document.getElementsByTagName('p'),
                _ds = clearly.document.getElementsByTagName('div');

            // add
            for (var i = 0; i < 5; i++) {
                _test_text += ' ' + $(_ps[Math.floor(Math.random() * _ps.length)]).text();
            }
            for (var i = 0; i < 5; i++) {
                _test_text += ' ' + $(_ds[Math.floor(Math.random() * _ds.length)]).text();
            }

            // check
            switch (true) {
            case (_test_text.match(/([\u3000])/gi) !== null):
            case (_test_text.match(/([\u3001])/gi) !== null):
            case (_test_text.match(/([\u3002])/gi) !== null):
            case (_test_text.match(/([\u301C])/gi) !== null):
                clearly.language = 'cjk';
                break;
            }

            // in case we stop
            clearly.log('Language: ' + clearly.language);
        };

        // Decide tagName of a node, we just need #text, a, img nodes
        clearly.getContent_detectNodeTagName = function (_node) {
            var _tag_name;

            if (_node.nodeType === 3) {
                _tag_name = '#text';
            } else if (_node.nodeType === 1 && _node.tagName && _node.tagName > '') {
                _tag_name = _node.tagName.toLowerCase();
            } else {
                _tag_name = '#invalid';
            }

            return _tag_name;
        };

        // Explore the node recursively, get candidate nodes
        clearly.getContent__exploreNodeAndGetStuff = function (_nodeToExplore, _justExploring) {
            var _global__element_index = 0,
                _global__inside_link = false,
                _global__inside_link__element_index = 0,
                _global__length__above_plain_text = 0,
                _global__count__above_plain_words = 0,
                _global__length__above_links_text = 0,
                _global__count__above_links_words = 0,
                _global__count__above_candidates = 0,
                _global__count__above_containers = 0,
                _global__above__plain_text = '',
                _global__above__links_text = '',
                _return__containers = [],
                _return__candidates = [],
                _return__links = [];

            // recursive function
            var _recursive = function (_node) {
                // increment index
                _global__element_index++;

                var _tag_name = clearly.getContent_detectNodeTagName(_node),
                    _result = {
                        '__index': _global__element_index,
                        '__node': _node,

                        '_is__container': (clearly.parsingOptions._elements_container.indexOf('|' + _tag_name + '|') > -1),
                        '_is__candidate': false,
                        '_is__text': false,
                        '_is__link': false,
                        '_is__link_skip': false,
                        '_is__image_small': false,
                        '_is__image_medium': false,
                        '_is__image_large': false,
                        '_is__image_skip': false,
                        '_debug__above__plain_text': _global__above__plain_text,
                        '_debug__above__links_text': _global__above__links_text,

                        '_length__above_plain_text': _global__length__above_plain_text,
                        '_count__above_plain_words': _global__count__above_plain_words,
                        '_length__above_links_text': _global__length__above_links_text,
                        '_count__above_links_words': _global__count__above_links_words,
                        '_length__above_all_text': (_global__length__above_plain_text + _global__length__above_links_text),
                        '_count__above_all_words': (_global__count__above_plain_words + _global__count__above_links_words),
                        '_count__above_candidates': _global__count__above_candidates,
                        '_count__above_containers': _global__count__above_containers,
                        '_length__plain_text': 0,
                        '_count__plain_words': 0,
                        '_length__links_text': 0,
                        '_count__links_words': 0,
                        '_length__all_text': 0,
                        '_count__all_words': 0,

                        '_count__containers': 0,
                        '_count__candidates': 0,
                        '_count__links': 0,
                        '_count__links_skip': 0,
                        '_count__images_small': 0,
                        '_count__images_medium': 0,
                        '_count__images_large': 0,
                        '_count__images_skip': 0
                    };

                // fast return
                switch (true) {
                    // will return, if node is invalid or ignored
                case ((_tag_name === '#invalid')):
                case ((clearly.parsingOptions._elements_ignore.indexOf('|' + _tag_name + '|') > -1)):
                    return;

                    // will return, if node is hidden
                case ((clearly.parsingOptions._elements_visible.indexOf('|' + _tag_name + '|') > -1)):
                    switch (true) {
                    case (_node.offsetWidth > 0):
                    case (_node.offsetHeight > 0):
                        break;
                    default:
                        switch (true) {
                        case (_node.offsetLeft > 0):
                        case (_node.offsetTop > 0):
                            break;
                        default:
                            return;
                        }
                        break;
                    }
                    break;

                    // will return, if node is self closing elements, besides img
                case (clearly.parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1):
                    switch (true) {
                    case ((_tag_name === 'img')):
                        break;
                    default:
                        return;
                    }
                    break;
                }

                // do stuff
                switch (true) {
                    // text node
                case ((_tag_name === '#text')):
                    _result._is__text = true;

                    var _nodeText = _node.nodeValue;

                    // result
                    _result._length__plain_text = clearly.measureText__getTextLength(_nodeText);
                    _result._count__plain_words = clearly.measureText__getWordCount(_nodeText);
                    if (_global__inside_link) {
                        _global__length__above_links_text += _result._length__plain_text;
                        _global__count__above_links_words += _result._count__plain_words;
                    } else {
                        _global__length__above_plain_text += _result._length__plain_text;
                        _global__count__above_plain_words += _result._count__plain_words;
                    }

                    return _result;

                    // link node
                case (_tag_name === 'a'):
                    var _href = _node.href;

                    // sanity
                    if (!_href || !_href.indexOf) {
                        break;
                    }

                    _result._is__link = true;

                    // skip
                    for (var i = 0, _i = clearly.skipStuffFromDomains__links.length; i < _i; i++) {
                        if (_node.href.indexOf(clearly.skipStuffFromDomains__links[i]) > -1) {
                            _result._is__link_skip = true;
                            break;
                        }
                    }

                    // inside link
                    if (_global__inside_link === false) {
                        _global__inside_link = true;
                        _global__inside_link__element_index = _result.__index;
                    }

                    // done
                    _return__links.push(_result);
                    break;

                    // image node
                case (_tag_name === 'img'):
                    // skip
                    if (_node.src && _node.src.indexOf) {
                        for (var i = 0, _i = clearly.skipStuffFromDomain__images.length; i < _i; i++) {
                            if (_node.src.indexOf(clearly.skipStuffFromDomain__images[i]) > -1) {
                                _result._is__image_skip = true;
                                break;
                            }
                        }
                    }

                    // size
                    var _width = $(_node).width(),
                        _height = $(_node).height();

                    switch (true) {
                    case ((_width * _height) >= 50000):
                    case ((_width >= 350) && _height >= 75):
                        _result._is__image_large = true;
                        break;
                    case ((_width * _height) >= 20000):
                    case ((_width >= 150) && (_height >= 150)):
                        _result._is__image_medium = true;
                        break;
                    case ((_width <= 5) && (_height <= 5)):
                        _result._is__image_skip = true;
                        break;
                    default:
                        _result._is__image_small = true;
                        break;
                    }
                    break;
                }

                // child nodes
                for (var i = 0, _i = _node.childNodes.length; i < _i; i++) {
                    var _child = _node.childNodes[i],
                        _child_result = _recursive(_child);

                    if (!_child_result) {
                        continue;
                    }

                    // add to result
                    _result._count__links += _child_result._count__links + (_child_result._is__link ? 1 : 0);
                    _result._count__links_skip += _child_result._count__links_skip + (_child_result._is__link_skip ? 1 : 0);
                    _result._count__images_small += _child_result._count__images_small + (_child_result._is__image_small ? 1 : 0);
                    _result._count__images_medium += _child_result._count__images_medium + (_child_result._is__image_medium ? 1 : 0);
                    _result._count__images_large += _child_result._count__images_large + (_child_result._is__image_large ? 1 : 0);
                    _result._count__images_skip += _child_result._count__images_skip + (_child_result._is__image_skip ? 1 : 0);
                    _result._count__containers += _child_result._count__containers + (_child_result._is__container ? 1 : 0);
                    _result._count__candidates += _child_result._count__candidates + (_child_result._is__candidate ? 1 : 0);
                    _result._length__all_text += _child_result._length__plain_text + _child_result._length__links_text;
                    _result._count__all_words += _child_result._count__plain_words + _child_result._count__links_words;

                    // plain text / link text
                    switch (true) {
                    case (_child_result._is__link):
                        // no text to add
                        _result._length__links_text += (_child_result._length__plain_text + _child_result._length__links_text);
                        _result._count__links_words += (_child_result._count__plain_words + _child_result._count__links_words);
                        break;
                    default:
                        _result._length__plain_text += _child_result._length__plain_text;
                        _result._count__plain_words += _child_result._count__plain_words;
                        _result._length__links_text += _child_result._length__links_text;
                        _result._count__links_words += _child_result._count__links_words;
                        break;
                    }
                }

                // after child nodes
                // mark as not in link anymore
                if (true && (_result._is__link) && (_global__inside_link__element_index === _result.__index)) {
                    _global__inside_link = false;
                    _global__inside_link__element_index = 0;
                }

                // add to containers
                if (_result._is__container || ((_result.__index === 1) && (_justExploring === true))) {
                    // add to containers
                    _return__containers.push(_result);
                    // increase above containers
                    if (_result._is__container) {
                        _global__count__above_containers++;
                    }

                    // add to candidates
                    if (!_justExploring) {
                        switch (true) {
                        case ((clearly.language !== 'cjk') && ((_result._count__links * 2) >= _result._count__plain_words)):
                            /* link ratio */
                        case ((clearly.language !== 'cjk') && (_result._length__plain_text < (65 / 3))):
                            /* text length */
                        case ((clearly.language !== 'cjk') && (_result._count__plain_words < 5)):
                            /* words */
                        case ((clearly.language === 'cjk') && (_result._length__plain_text < 10)):
                            /* text length */
                        case ((clearly.language === 'cjk') && (_result._count__plain_words < 2)):
                            /* words */
                            break;
                        default:
                            // good candidate
                            _result._is__candidate = true;
                            _return__candidates.push(_result);
                            // increase above candidates
                            _global__count__above_candidates++;
                            break;
                        }

                        // special case for body -- if it was just skipped
                        if ((_result.__index === 1) && !(_result._is__candidate)) {
                            _result._is__candidate = true;
                            _result._is__bad = true;
                            _return__candidates.push(_result);
                        }
                    }
                }

                // return
                return _result;
            };

            // actually do it
            _recursive(_nodeToExplore);

            // just exploring -- return first thing
            if (_justExploring) {
                return _return__containers.pop();
            }

            // return containers list
            return {
                '_containers': _return__containers,
                '_candidates': _return__candidates,
                '_links': _return__links
            };
        };

        clearly.getContent__processCandidates = function (_candidatesToProcess) {
            // process this var
            var _candidates = _candidatesToProcess;

            // sort _candidates -- the lower in the dom, the closer to position 0
            _candidates.sort(function (a, b) {
                switch (true) {
                case (a.__index < b.__index):
                    return -1;
                case (a.__index > b.__index):
                    return 1;
                default:
                    return 0;
                }
            });

            // get first
            var _main = _candidates[0];

            // pieces of text
            // and points computation
            for (var i = 0, _i = _candidates.length; i < _i; i++) {
                // pieces
                var _count__pieces = 0,
                    _array__pieces = [];

                for (var k = i, _k = _candidates.length; k < _k; k++) {
                    if (_candidates[k]._count__candidates > 0) {
                        continue;
                    }
                    if ($.contains(_candidates[i].__node, _candidates[k].__node) === false) {
                        continue;
                    }
                    // incement pieces count
                    _count__pieces++;
                }

                // candidate details
                _candidates[i]['__candidate_details'] = clearly.getContent__computeDetailsForCandidate(_candidates[i], _main);

                // pieces -- do this here because _main doesn't yet have a pieces count
                // set pieces
                _candidates[i]['_count__pieces'] = _count__pieces;
                _candidates[i]['_array__pieces'] = _array__pieces;
                // pieces ratio
                _candidates[i]['__candidate_details']['_ratio__count__pieces_to_total_pieces'] = (_count__pieces / (_candidates[0]._count__pieces + 1));

                // points
                _candidates[i].__points_history = clearly.getContent__computePointsForCandidate(_candidates[i], _main);
                _candidates[i].__points = _candidates[i].__points_history[0];
            }

            // sort _candidates -- the more points, the closer to position 0
            _candidates.sort(function (a, b) {
                switch (true) {
                case (a.__points > b.__points):
                    return -1;
                case (a.__points < b.__points):
                    return 1;
                default:
                    return 0;
                }
            });

            // return
            return _candidates;
        };

        clearly.getContent__computeDetailsForCandidate = function (_e, _main) {
            var _r = {};

            // bad candidate
            if (_e._is__bad) {
                return _r;
            }

            // paragraphs
            _r['_count__lines_of_65_characters'] = (_e._length__plain_text / 65);
            _r['_count__paragraphs_of_3_lines'] = (_r._count__lines_of_65_characters / 3);
            _r['_count__paragraphs_of_5_lines'] = (_r._count__lines_of_65_characters / 5);
            _r['_count__paragraphs_of_50_words'] = (_e._count__plain_words / 50);
            _r['_count__paragraphs_of_80_words'] = (_e._count__plain_words / 80);

            // total text
            _r['_ratio__length__plain_text_to_total_plain_text'] = (_e._length__plain_text / _main._length__plain_text);
            _r['_ratio__count__plain_words_to_total_plain_words'] = (_e._count__plain_words / _main._count__plain_words);

            // links
            _r['_ratio__length__links_text_to_plain_text'] = (_e._length__links_text / _e._length__plain_text);
            _r['_ratio__count__links_words_to_plain_words'] = (_e._count__links_words / _e._count__plain_words);
            _r['_ratio__length__links_text_to_all_text'] = (_e._length__links_text / _e._length__all_text);
            _r['_ratio__count__links_words_to_all_words'] = (_e._count__links_words / _e._count__all_words);
            _r['_ratio__length__links_text_to_total_links_text'] = (_e._length__links_text / (_main._length__links_text + 1));
            _r['_ratio__count__links_words_to_total_links_words'] = (_e._count__links_words / (_main._count__links_words + 1));
            _r['_ratio__count__links_to_total_links'] = (_e._count__links / (_main._count__links + 1));
            _r['_ratio__count__links_to_plain_words'] = ((_e._count__links * 2) / _e._count__plain_words);

            // text above
            var _divide__candidates = Math.max(2, Math.ceil(_e._count__above_candidates * 0.5)),
                _above_text = ((0 + (_e._length__above_plain_text * 1) + (_e._length__above_plain_text / _divide__candidates)) / 2),
                _above_words = ((0 + (_e._count__above_plain_words * 1) + (_e._count__above_plain_words / _divide__candidates)) / 2);

            _r['_ratio__length__above_plain_text_to_total_plain_text'] = (_above_text / _main._length__plain_text);
            _r['_ratio__count__above_plain_words_to_total_plain_words'] = (_above_words / _main._count__plain_words);

            // candidates
            _r['_ratio__count__candidates_to_total_candidates'] = (_e._count__candidates / (_main._count__candidates + 1));
            _r['_ratio__count__containers_to_total_containers'] = (_e._count__containers / (_main._count__containers + 1));

            // return
            return _r;
        };

        clearly.getContent__computePointsForCandidate = function (_e, _main) {
            var _details = _e.__candidate_details,
                _points_history = [],
                _really_big = ((_main._length__plain_text / 65) > 250);

            // bad candidate
            if (_e._is__bad) {
                return [0];
            }

            // the basics
            _points_history.unshift(((0 + (_details._count__paragraphs_of_3_lines) + (_details._count__paragraphs_of_5_lines * 1.5) + (_details._count__paragraphs_of_50_words) + (_details._count__paragraphs_of_80_words * 1.5) + (_e._count__images_large * 3) - ((_e._count__images_skip + _e._count__images_small) * 0.5)) * 1000));

            // negative
            if (_points_history[0] < 0) {
                return [0];
            }

            // candidates and containers
            var _divide__pieces = Math.max(5, Math.ceil(_e._count__pieces * 0.25)),
                _divide__candidates = Math.max(5, Math.ceil(_e._count__candidates * 0.25)),
                _divide__containers = Math.max(10, Math.ceil(_e._count__containers * 0.25));

            _points_history.unshift(((0 + (_points_history[0] * 3) + (_points_history[0] / _divide__pieces) + (_points_history[0] / _divide__candidates) + (_points_history[0] / _divide__containers)) / 6));

            // total text
            clearly.getContent__computePointsForCandidate__do(0.10, 2, (1 - (1 - _details._ratio__length__plain_text_to_total_plain_text)), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 2, (1 - (1 - _details._ratio__count__plain_words_to_total_plain_words)), _points_history);
            if (_really_big) {
                clearly.getContent__computePointsForCandidate__do(0.10, 4, (1 - (1 - _details._ratio__length__plain_text_to_total_plain_text)), _points_history);
                clearly.getContent__computePointsForCandidate__do(0.10, 4, (1 - (1 - _details._ratio__count__plain_words_to_total_plain_words)), _points_history);
            }

            // text above
            clearly.getContent__computePointsForCandidate__do(0.10, 5, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 5, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);
            if (_really_big) {
                clearly.getContent__computePointsForCandidate__do(0.10, 10, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
                clearly.getContent__computePointsForCandidate__do(0.10, 10, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);
            }

            // links outer
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__length__links_text_to_total_links_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__links_words_to_total_links_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__links_to_total_links), _points_history);

            // links inner
            var __lr = (clearly.language === 'cjk' ? 0.75 : 0.50);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_all_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_all_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_to_plain_words), _points_history);

            // candidates, pieces
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__candidates_to_total_candidates), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__containers_to_total_containers), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details._ratio__count__pieces_to_total_pieces), _points_history);

            // return -- will get [0] as the actual final points
            return _points_history;
        };

        clearly.getContent__processCandidatesSecond = function (_processedCandidates) {
            var _candidates = _processedCandidates,
                _main = _candidates[0];

            // only get children of target
            _candidates = $.map(_candidates, function (_element, _index) {
                switch (true) {
                case (!(_index > 0)):
                case (!($.contains(_main.__node, _element.__node))):
                    return null;
                default:
                    return _element;
                }
            });
            // add main - to amke sure the result is never blank
            _candidates.unshift(_main);

            // sort _candidates -- the lower in the dom, the closer to position 0
            _candidates.sort(function (a, b) {
                switch (true) {
                case (a.__index < b.__index):
                    return -1;
                case (a.__index > b.__index):
                    return 1;
                default:
                    return 0;
                }
            });

            // second candidate computation
            for (var i = 0, _i = _candidates.length; i < _i; i++) {
                // additional numbers
                _candidates[i].__second_length__above_plain_text = (_candidates[i]._length__above_plain_text - _main._length__above_plain_text);
                _candidates[i].__second_count__above_plain_words = (_candidates[i]._count__above_plain_words - _main._count__above_plain_words);
                // candidate details
                _candidates[i]['__candidate_details_second'] = clearly.getContent__computeDetailsForCandidateSecond(_candidates[i], _main);
                // check some more

                // points
                _candidates[i].__points_history_second = clearly.getContent__computePointsForCandidateSecond(_candidates[i], _main);
                _candidates[i].__points_second = _candidates[i].__points_history_second[0];
            }

            // sort _candidates -- the more points, the closer to position 0
            _candidates.sort(function (a, b) {
                switch (true) {
                case (a.__points_second > b.__points_second):
                    return -1;
                case (a.__points_second < b.__points_second):
                    return 1;
                default:
                    return 0;
                }
            });

            // return
            return _candidates;
        };

        clearly.getContent__computeDetailsForCandidateSecond = function (_e, _main) {
            var _r = {};

            // bad candidate
            if (_e._is__bad) {
                return _r;
            }

            // total text
            _r['_ratio__length__plain_text_to_total_plain_text'] = (_e._length__plain_text / _main._length__plain_text);
            _r['_ratio__count__plain_words_to_total_plain_words'] = (_e._count__plain_words / _main._count__plain_words);

            // links
            _r['_ratio__length__links_text_to_all_text'] = (_e._length__links_text / _e._length__all_text);
            _r['_ratio__count__links_words_to_all_words'] = (_e._count__links_words / _e._count__all_words);
            _r['_ratio__length__links_text_to_total_links_text'] = (_e._length__links_text / (_main._length__links_text + 1));
            _r['_ratio__count__links_words_to_total_links_words'] = (_e._count__links_words / (_main._count__links_words + 1));
            _r['_ratio__count__links_to_total_links'] = (_e._count__links / (_main._count__links + 1));
            _r['_ratio__count__links_to_plain_words'] = ((_e._count__links * 2) / _e._count__plain_words);

            // text above
            var _divide__candidates = Math.max(2, Math.ceil((_e._count__above_candidates - _main._count__above_candidates) * 0.5)),
                _above_text = ((0 + (_e.__second_length__above_plain_text * 1) + (_e.__second_length__above_plain_text / _divide__candidates)) / 2),
                _above_words = ((0 + (_e.__second_count__above_plain_words * 1) + (_e.__second_count__above_plain_words / _divide__candidates)) / 2);

            _r['_ratio__length__above_plain_text_to_total_plain_text'] = (_above_text / _main._length__plain_text);
            _r['_ratio__count__above_plain_words_to_total_plain_words'] = (_above_words / _main._count__plain_words);
            _r['_ratio__length__above_plain_text_to_plain_text'] = (_above_text / _e._length__plain_text);
            _r['_ratio__count__above_plain_words_to_plain_words'] = (_above_words / _e._count__plain_words);

            // candidates
            _r['_ratio__count__candidates_to_total_candidates'] = (Math.max(0, (_e._count__candidates - (_main._count__candidates * 0.25))) / (_main._count__candidates + 1));
            _r['_ratio__count__containers_to_total_containers'] = (Math.max(0, (_e._count__containers - (_main._count__containers * 0.25))) / (_main._count__containers + 1));
            _r['_ratio__count__pieces_to_total_pieces'] = (Math.max(0, (_e._count__pieces - (_main._count__pieces * 0.25))) / (_main._count__pieces + 1));

            // return
            return _r;
        };

        clearly.getContent__computePointsForCandidateSecond = function (_e, _main) {
            var _details = _e.__candidate_details,
                _details_second = _e.__candidate_details_second,
                _points_history = [];

            // bad candidate
            if (_e._is__bad) {
                return [0];
            }

            // get initial points
            _points_history.unshift(_e.__points_history[(_e.__points_history.length - 1)]);

            // candidates and containers
            var _divide__pieces = Math.max(5, Math.ceil(_e._count__pieces * 0.25)),
                _divide__candidates = Math.max(5, Math.ceil(_e._count__candidates * 0.25)),
                _divide__containers = Math.max(10, Math.ceil(_e._count__containers * 0.25));

            _points_history.unshift(((0 + (_points_history[0] * 3) + ((_points_history[0] / _divide__pieces) * 2) + ((_points_history[0] / _divide__candidates) * 2) + ((_points_history[0] / _divide__containers) * 2)) / 9));

            // total text
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - (1 - _details_second._ratio__length__plain_text_to_total_plain_text)), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - (1 - _details_second._ratio__count__plain_words_to_total_plain_words)), _points_history);

            // text above
            var __ar = (clearly.language === 'cjk' ? 0.50 : 0.10);
            clearly.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__count__above_plain_words_to_total_plain_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__length__above_plain_text_to_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(__ar, 1, (1 - _details_second._ratio__count__above_plain_words_to_plain_words), _points_history);

            // links outer
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details_second._ratio__count__links_to_total_links), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details_second._ratio__length__links_text_to_total_links_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - _details_second._ratio__count__links_words_to_total_links_words), _points_history);

            // links inner
            var __lr = (clearly.language === 'cjk' ? 0.75 : 0.50);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details_second._ratio__length__links_text_to_all_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details_second._ratio__count__links_words_to_all_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(__lr, 1, (1 - _details_second._ratio__count__links_to_plain_words), _points_history);

            // candidates, containers, pieces
            clearly.getContent__computePointsForCandidate__do(0.10, 2, (1 - _details_second._ratio__count__candidates_to_total_candidates), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 2, (1 - _details_second._ratio__count__containers_to_total_containers), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 2, (1 - _details_second._ratio__count__pieces_to_total_pieces), _points_history);

            // return -- will get [0] as the actual final points
            return _points_history;
        };

        clearly.getContent__computePointsForCandidateThird = function (_e, _main) {
            var _details = _e.__candidate_details,
                _details_second = _e.__candidate_details_second,
                _points_history = [];

            // bad candidate
            if (_e._is__bad) {
                return [0];
            }

            // get initial points
            _points_history.unshift(_e.__points_history[(_e.__points_history.length - 1)]);

            // candidates and containers
            var _divide__pieces = Math.max(2, Math.ceil(_e._count__pieces * 0.25)),
                _divide__candidates = Math.max(2, Math.ceil(_e._count__candidates * 0.25)),
                _divide__containers = Math.max(4, Math.ceil(_e._count__containers * 0.25));

            _points_history.unshift(((0 + (_points_history[0] * 3) + ((_points_history[0] / _divide__pieces) * 2) + ((_points_history[0] / _divide__candidates) * 2) + ((_points_history[0] / _divide__containers) * 2)) / 9));

            // total text
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - (1 - _details_second._ratio__length__plain_text_to_total_plain_text)), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.75, 1, (1 - (1 - _details_second._ratio__count__plain_words_to_total_plain_words)), _points_history);

            // text above
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__above_plain_words_to_total_plain_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__length__above_plain_text_to_total_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__count__above_plain_words_to_total_plain_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__length__above_plain_text_to_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.10, 1, (1 - _details_second._ratio__count__above_plain_words_to_plain_words), _points_history);

            // links inner
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__links_text_to_all_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_words_to_all_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__length__links_text_to_plain_text), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_words_to_plain_words), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__links_to_plain_words), _points_history);

            // candidates, pieces
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__candidates_to_total_candidates), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__containers_to_total_containers), _points_history);
            clearly.getContent__computePointsForCandidate__do(0.50, 1, (1 - _details._ratio__count__pieces_to_total_pieces), _points_history);

            // return -- will get [0] as the actual final points
            return _points_history;
        };

        clearly.getContent__computePointsForCandidate__do = function (_ratio_remaining, _power, _ratio, _points_history) {
            var _points_remaining = (_points_history[0] * _ratio_remaining),
                _points_to_compute = (_points_history[0] - _points_remaining),
                _points_return = 0;

            if (_ratio < 0) {
                //_points_return = (0.75 * _points_remaining);
                _points_return = _points_remaining;
            } else {
                _points_return = 0 + _points_remaining + (_points_to_compute * Math.pow(_ratio, _power));
            }
            // add
            _points_history.unshift(_points_return);
        };

        clearly.getContent__buildHTMLForNode = function (_nodeToBuildHTMLFor, _custom_mode) {
            var _global__element_index = 0,
                _global__the_html = '',
                _global__exploreNodeToBuildHTMLFor = clearly.getContent__exploreNodeAndGetStuff(_nodeToBuildHTMLFor, true);

            // custom
            switch (_custom_mode) {
            case 'above-the-target':
                _global__exploreNodeToBuildHTMLFor = false;
                break;
            }

            // recursive function
            var _recursive = function (_node) {
                // increment index -- starts with 1
                _global__element_index++;

                // vars
                var _explored = false,
                    _tag_name = clearly.getContent_detectNodeTagName(_node),
                    _pos__start__before = 0,
                    _pos__start__after = 0,
                    _pos__end__before = 0,
                    _pos__end__after = 0;

                // fast return on invalid nodes, ignored nodes, text nodes
                switch (true) {
                case ((_tag_name === '#invalid')):
                case ((clearly.parsingOptions._elements_ignore.indexOf('|' + _tag_name + '|') > -1)):
                    return;
                case (_tag_name === '#text'):
                    _global__the_html += _node.nodeValue.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
                    return;
                }

                // will return, if node is hidden
                if (clearly.parsingOptions._elements_visible.indexOf('|' + _tag_name + '|') > -1) {
                    switch (true) {
                    case (_node.offsetWidth > 0):
                    case (_node.offsetHeight > 0):
                        break;
                    default:
                        switch (true) {
                        case (_node.offsetLeft > 0):
                        case (_node.offsetTop > 0):
                            break;
                        default:
                            return;
                        }
                        break;
                    }
                }

                // clean -- before
                // just a return will skip the whole element
                // including children

                // objects, embeds, iframes
                // @TODO chinese video website objects need furthur work
                switch (_tag_name) {
                case ('object'):
                case ('embed'):
                case ('iframe'):
                    var _src = '';
                    if (_tag_name === 'object') {
                        if ($(_node).find("param[name='movie']").length > 0) {
                            _src = $(_node).find("param[name='movie']").attr('value');
                        } else if ($(_node).find("param[name='src']").length > 0) {
                            _src = $(_node).find("param[name='src']").attr('value');
                        }
                    } else {
                        _src = $(_node).attr('src');
                    }

                    clearly.log('Video SRC: ' + _src);

                    var _skip = ((_src > '') ? false : true);

                    if (_skip === false) {
                        _skip = true;
                        // keep stuff from certain domains
                        for (var i = 0, _i = clearly.keepStuffFromDomain__video.length; i < _i; i++) {
                            if (_src.indexOf(clearly.keepStuffFromDomain__video[i]) > -1) {
                                _skip = false;
                                break;
                            }
                        }
                    }

                    // skip?
                    if (_skip) {
                        return;
                    }

                    break;
                }

                // skipped link
                if (_tag_name === 'a') {
                    _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true) {
                    case (_explored._is__link_skip):
                    case (((_explored._count__images_small + _explored._count__images_skip) > 0) && (_explored._length__plain_text < 65)):
                        return;
                    }
                }

                // link density
                if (clearly.parsingOptions._elements_link_density.indexOf('|' + _tag_name + '|') > -1) {
                    _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true) {
                    case (_explored._length__plain_text > (65 * 3 * 2)):
                    case (clearly.language === 'cjk' && (_explored._length__plain_text > (65 * 3 * 1))):
                    case (!(_explored._count__links > 1)):
                    case (_global__exploreNodeToBuildHTMLFor && (_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.5):
                    case (_global__exploreNodeToBuildHTMLFor && (_explored._count__plain_words / _global__exploreNodeToBuildHTMLFor._count__plain_words) > 0.5):
                    case ((_explored._length__plain_text === 0) && (_explored._count__links === 1) && (_explored._length__links_text < 65)):
                    case ((_explored._length__plain_text < 25) && ((_explored._count__images_large + _explored._count__images_medium) > 0)):
                        break;
                    case ((_explored._length__links_text / _explored._length__all_text) < 0.5):
                        if (_explored._count__links <= 0) {
                            break;
                        }
                        if (_explored._count__links_skip <= 0) {
                            break;
                        }
                        if (((_explored._count__links_skip / _explored._count__links) > 0.25) && (_explored._length__links_text / _explored._length__all_text) < 0.05) {
                            break;
                        }
                        break;
                    default:
                        return;
                    }
                }

                // floating
                if (clearly.parsingOptions._elements_floating.indexOf('|' + _tag_name + '|') > -1) {
                    _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true) {
                    case (_explored._length__plain_text > (65 * 3 * 2)):
                    case (clearly.language === 'cjk' && (_explored._length__plain_text > (65 * 3 * 1))):
                    case (_global__exploreNodeToBuildHTMLFor && (_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.25):
                    case (_global__exploreNodeToBuildHTMLFor && (_explored._count__plain_words / _global__exploreNodeToBuildHTMLFor._count__plain_words) > 0.25):
                    case ((_explored._length__plain_text < 25) && (_explored._length__links_text < 25) && ((_explored._count__images_large + _explored._count__images_medium) > 0)):
                        break;
                    default:
                        var _float = $(_node).css('float');
                        if (!(_float === 'left' || _float === 'right')) {
                            break;
                        }
                        if ((_explored._length__links_text === 0) && ((_explored._count__images_large + _explored._count__images_medium) > 0)) {
                            break;
                        }
                        return;
                    }
                }

                // above target
                if (_custom_mode === 'above-the-target') {
                    if (clearly.parsingOptions._elements_above_target.indexOf('|' + _tag_name + '|') > -1) {
                        return;
                    }
                    if (_tag_name === 'img') {
                        _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                        if (!_explored._is__image_large) {
                            return;
                        }
                    }
                }

                // start tag
                if (clearly.parsingOptions._elements_ignore_tag.indexOf('|' + _tag_name + '|') < 0) {
                    _pos__start__before = _global__the_html.length; /* mark */
                    _global__the_html += '<' + _tag_name; /* add */

                    // allowed attributes
                    if (_tag_name in clearly.parsingOptions._elements_keep_attributes) {
                        for (var i = 0, _i = clearly.parsingOptions._elements_keep_attributes[_tag_name].length; i < _i; i++) {
                            var _attribute_name = clearly.parsingOptions._elements_keep_attributes[_tag_name][i],
                                _attribute_value = _node.getAttribute(_attribute_name);

                            // we need to get absolute path for img elements
                            if ((_tag_name === 'img') && (_attribute_name === 'src')) {
                                var img = document.createElement('img');
                                img.src = _attribute_value;
                                _attribute_value = img.src;
                                img.src = null;
                            }

                            // if present
                            if (_attribute_value > '') {
                                _global__the_html += ' ' + _attribute_name + '="' + (_attribute_value) + '"';
                            }
                        }
                    }

                    // keep ID for all elements
                    var _id_attribute = _node.getAttribute('id');
                    if (_id_attribute > '') {
                        _global__the_html += ' id="' + _id_attribute + '"';
                    }

                    // links target NEW
                    if (_tag_name === 'a') {
                        _global__the_html += ' target="_blank"';
                    }

                    // close start
                    if (clearly.parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1) {
                        _global__the_html += ' />';
                    } else {
                        _global__the_html += '>';
                    }

                    /* mark */
                    _pos__start__after = _global__the_html.length;
                }

                // child nodes
                if (clearly.parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') < 0) {
                    for (var i = 0, _i = _node.childNodes.length; i < _i; i++) {
                        _recursive(_node.childNodes[i]);
                    }
                }

                // end tag
                switch (true) {
                case ((clearly.parsingOptions._elements_ignore_tag.indexOf('|' + _tag_name + '|') > -1)):
                    return;
                case ((clearly.parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1)):
                    _pos__end__before = _global__the_html.length; /* mark */
                    _pos__end__after = _global__the_html.length; /* mark */
                    break;
                default:
                    _pos__end__before = _global__the_html.length; /* end */
                    _global__the_html += '</' + _tag_name + '>'; /* mark */
                    _pos__end__after = _global__the_html.length;
                    break;
                }

                // clean -- after
                // we need to actually cut things out of
                // "_global__the_html", for stuff to not be there
                // largeObject classes
                if (_tag_name === 'iframe' || _tag_name === 'embed' || _tag_name === 'object') {
                    _global__the_html = '' + _global__the_html.substr(0, _pos__start__before) + '<div class="readableLargeObjectContainer">' + _global__the_html.substr(_pos__start__before, (_pos__end__after - _pos__start__before)) + '</div>';
                    return;
                }

                // add image classes
                if (_tag_name === 'img') {
                    _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true) {
                    case (_explored._is__image_skip):
                        _global__the_html = _global__the_html.substr(0, _pos__start__before);
                        return;
                    case (_explored._is__image_large):
                        _global__the_html = '' + _global__the_html.substr(0, _pos__start__before) + '<div class="readableLargeImageContainer' + (($(_node).width() <= 250) && ($(_node).height() >= 250) ? ' float' : '') + '">' + _global__the_html.substr(_pos__start__before, (_pos__end__after - _pos__start__before)) + '</div>';
                        return;
                    }
                }

                // large images in links
                if (_tag_name === 'a') {
                    _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true) {
                    case (_explored._count__images_large === 1):
                        _global__the_html = '' + _global__the_html.substr(0, _pos__start__after - 1) + ' class="readableLinkWithLargeImage">' + _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after)) + '</a>';
                        return;
                    case (_explored._count__images_medium === 1):
                        _global__the_html = '' + _global__the_html.substr(0, _pos__start__after - 1) + ' class="readableLinkWithMediumImage">' + _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after)) + '</a>';
                        return;
                    }
                }

                // too much content
                if (clearly.parsingOptions._elements_too_much_content.indexOf('|' + _tag_name + '|') > -1) {
                    _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                    switch (true) {
                    case (_tag_name === 'h1' && (_explored._length__all_text > (65 * 2))):
                    case (_tag_name === 'h2' && (_explored._length__all_text > (65 * 2 * 3))):
                    case ((_tag_name.match(/^h(3|4|5|6)$/) !== null) && (_explored._length__all_text > (65 * 2 * 5))):
                    case ((_tag_name.match(/^(b|i|em|strong)$/) !== null) && (_explored._length__all_text > (65 * 5 * 5))):
                        _global__the_html = '' + _global__the_html.substr(0, _pos__start__before) + _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after));
                        return;
                    }
                }

                // empty elements
                switch (true) {
                case ((clearly.parsingOptions._elements_self_closing.indexOf('|' + _tag_name + '|') > -1)):
                case ((clearly.parsingOptions._elements_ignore_tag.indexOf('|' + _tag_name + '|') > -1)):
                case (_tag_name === 'td'):
                    break;
                default:
                    var _contents = _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after));
                    _contents = _contents.replace(/(<br \/>)/gi, '');
                    _contents = _contents.replace(/(<hr \/>)/gi, '');
                    var _contentsLength = clearly.measureText__getTextLength(_contents);
                    switch (true) {
                    case (_contentsLength === 0 && _tag_name === 'p'):
                        _global__the_html = _global__the_html.substr(0, _pos__start__before) + '<br /><br />';
                        return;
                    case (_contentsLength === 0):
                    case ((_contentsLength < 5) && (clearly.parsingOptions._elements_visible.indexOf('|' + _tag_name + '|') > -1)):
                        _global__the_html = _global__the_html.substr(0, _pos__start__before);
                        return;
                    }
                    break;
                }

                // too much missing
                if (clearly.parsingOptions._elements_link_density.indexOf('|' + _tag_name + '|') > -1) {
                    _explored = (_explored || clearly.getContent__exploreNodeAndGetStuff(_node, true));
                    var _contents = _global__the_html.substr(_pos__start__after, (_pos__end__before - _pos__start__after)).replace(/(<([^>]+)>)/gi, ''),
                        _contentsLength = clearly.measureText__getTextLength(_contents),
                        _initialLength = 0 + _explored._length__all_text + (_explored._count__images_small * 10) + (_explored._count__images_skip * 10) + (_node.getElementsByTagName('iframe').length * 10) + (_node.getElementsByTagName('object').length * 10) + (_node.getElementsByTagName('embed').length * 10) + (_node.getElementsByTagName('button').length * 10) + (_node.getElementsByTagName('input').length * 10) + (_node.getElementsByTagName('select').length * 10) + (_node.getElementsByTagName('textarea').length * 10);
                    // too much missing
                    switch (true) {
                    case (!(_contentsLength > 0)):
                    case (!(_initialLength > 0)):
                    case (!((_contentsLength / _initialLength) < 0.5)):
                    case (!((clearly.language === 'cjk') && (_contentsLength / _initialLength) < 0.1)):
                    case ((_global__exploreNodeToBuildHTMLFor && ((_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.25))):
                    case ((clearly.language === 'cjk') && (_global__exploreNodeToBuildHTMLFor && ((_explored._length__plain_text / _global__exploreNodeToBuildHTMLFor._length__plain_text) > 0.1))):
                        break;
                    default:
                        _global__the_html = _global__the_html.substr(0, _pos__start__before);
                        return;
                    }
                }

                // return
                return;
            };

            // actually do it
            _recursive(_nodeToBuildHTMLFor);

            // return html
            return _global__the_html;
        };

        // Find page title, h{1,2,3} within the body is preferred, if not found, document.title is used
        clearly.getContent__find = function () {
            // get content
            var _found = clearly.getContent__findInPage(clearly.window),
                _targetNode = _found._targetCandidate.__node,
                _$targetNode = $(_targetNode);

            // prev html => to fist target
            var _foundHTML = _found._html,
                _prevNode = _found._targetCandidate.__node,
                _prevHTML = '',
                _foundTitle = false;

            (function () {
                while (true) {
                    switch (true) {
                    case ((_prevNode.tagName && _prevNode.tagName.toLowerCase() === 'body')):
                    case ((_found._firstCandidate.__node !== _found._targetCandidate.__node) && (_prevNode === _found._firstCandidate.__node)):
                        return;
                    }

                    // do it
                    if (_prevNode.previousSibling) {
                        // previous
                        _prevNode = _prevNode.previousSibling;

                        // get html
                        var _h = clearly.getContent__buildHTMLForNode(_prevNode, 'above-the-target');
                        _prevHTML = _h + _prevHTML;
                        _foundHTML = _h + _foundHTML;

                        // finished?
                        if (clearly.measureText__getTextLength(_prevHTML.replace(/<[^>]+?>/gi, '')) > (65 * 3 * 3)) {
                            return;
                        }

                        // found heading
                        var _headingStartPos = _foundHTML.indexOf('<h1');
                        _headingStartPos = (_headingStartPos > -1 ? _headingStartPos : _foundHTML.indexOf('<h2'));
                        _headingStartPos = (_headingStartPos > -1 ? _headingStartPos : _foundHTML.indexOf('<h3'));
                        if (_headingStartPos > -1) {
                            var _toHeadingLength = clearly.measureText__getTextLength(_foundHTML.substr(0, _headingStartPos).replace(/<[^>]+?>/gi, ''));
                            if (_toHeadingLength < (65 * 3 * 2)) {
                                clearly.log('use title found in page');
                                _foundTitle = true;
                                return;
                            }
                        }
                    } else {
                        _prevNode = _prevNode.parentNode;
                    }
                }
            })();

            // get document title
            if (!_foundTitle) {
                if (clearly.document.title > '') {
                    clearly.log('use title from document.title');
                    var _the_title = '',
                        _doc_title = clearly.document.title,
                        _doc_title_parts = [],
                        _doc_title_pregs = [/( [-][-] |( [-] )|( [>][>] )|( [<][<] )|( [|] )|( [\/] ))/i, /(([:] ))/i];

                    // loop through pregs, until we managed a split
                    for (var i = 0, _i = _doc_title_pregs.length; i < _i; i++) {
                        _doc_title_parts = _doc_title.split(_doc_title_pregs[i]);
                        if (_doc_title_parts.length > 1) {
                            break;
                        }
                    }

                    // sort title parts, longer goes higher up -- i.e. towards 0
                    _doc_title_parts.sort(function (a, b) {
                        switch (true) {
                        case (a.length > b.length):
                            return -1;
                        case (a.length < b.length):
                            return 1;
                        default:
                            return 0;
                        }
                    });

                    // more than one word?
                    _the_title = (_doc_title_parts[0].split(/\s+/i).length > 1 ? _doc_title_parts[0] : _doc_title);

                    // add
                    _foundHTML = '<h1>' + _the_title + '</h1>' + _foundHTML;
                }
            }

            // return
            return _foundHTML;
        };

        // Find the most promising candidate that acts as the main container, then build HTML
        clearly.getContent__findInPage = function (_pageWindow) {
            var _firstCandidate = false,
                _secondCandidate = false,
                _targetCandidate = false;

            var _stuff = clearly.getContent__exploreNodeAndGetStuff(_pageWindow.document.body);

            clearly.log('getContent__processCandidates: 1st round');
            var _processedCandidates = clearly.getContent__processCandidates(_stuff._candidates);

            _firstCandidate = _processedCandidates[0];
            _targetCandidate = _firstCandidate;

            // do second?
            switch (true) {
            case (!(_firstCandidate._count__containers > 0)):
            case (!(_firstCandidate._count__candidates > 0)):
            case (!(_firstCandidate._count__pieces > 0)):
            case (!(_firstCandidate._count__containers > 25)):
                break;
            default:

                clearly.log('getContent__processCandidates: 2nd round');
                var _processedCandidatesSecond = clearly.getContent__processCandidatesSecond(_processedCandidates);
                _secondCandidate = _processedCandidatesSecond[0];

                // they're the same
                if (_firstCandidate.__node === _secondCandidate.__node) {
                    break;
                }

                // compute again
                clearly.log('getContent__processCandidates: 3rd round');
                _firstCandidate['__points_history_final'] = clearly.getContent__computePointsForCandidateThird(_firstCandidate, _firstCandidate);
                _firstCandidate['__points_final'] = _firstCandidate.__points_history_final[0];
                _secondCandidate['__points_history_final'] = clearly.getContent__computePointsForCandidateThird(_secondCandidate, _firstCandidate);
                _secondCandidate['__points_final'] = _secondCandidate.__points_history_final[0];

                // are we selecting _second?
                switch (true) {
                case ((_secondCandidate.__candidate_details._count__lines_of_65_characters < 20) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 1):
                case ((_secondCandidate.__candidate_details._count__lines_of_65_characters > 20) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 0.9):
                case ((_secondCandidate.__candidate_details._count__lines_of_65_characters > 50) && (_secondCandidate.__points_final / _firstCandidate.__points_final) > 0.75):
                    _targetCandidate = _secondCandidate;
                    break;
                }

                break;
            }

            clearly.log(_targetCandidate.__node);

            // get html
            var _html = clearly.getContent__buildHTMLForNode(_targetCandidate.__node, 'the-target');

            // @TODO handle illegal self-closing elements such as <br> <hr>
            _html = _html.substr((_html.indexOf('>') + 1), _html.lastIndexOf('<'));
            _html = _html.replace(/<(blockquote|div|p|td|li)([^>]*)>(\s*<br \/>)+/gi, '<$1$2>'); // multiple ending BR
            _html = _html.replace(/(<br \/>\s*)+<\/(blockquote|div|p|td|li)>/gi, '</$2>'); // multiple procceding BR
            _html = _html.replace(/(<br \/>\s*)+<(blockquote|div|h\d|ol|p|table|ul|li)([^>]*)>/gi, '<$2$3>'); // multiple procceding BR
            _html = _html.replace(/<\/(blockquote|div|h\d|ol|p|table|ul|li)>(\s*<br \/>)+/gi, '</$1>'); // multiple ending BR
            _html = _html.replace(/(<hr \/>\s*<hr \/>\s*)+/gi, '<hr />'); // multiple HR
            _html = _html.replace(/(<br \/>\s*<br \/>\s*)+/gi, '<br /><br />'); // multiple BR

            // return
            return {
                '_html': _html,
                '_links': _stuff._links,
                '_targetCandidate': _targetCandidate,
                '_firstCandidate': _firstCandidate
            };
        };

        // auto-launch
        return clearly.getContent();

    })(window.clearly);
})();

        window.THE_FEWKLY_BM.sendMessage({
            action: "clearly",
            results: results
        }, function () {});

    }, 1);

}
