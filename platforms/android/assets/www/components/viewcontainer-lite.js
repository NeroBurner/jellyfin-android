define(["browser"],function(e){function t(){return E?e.tv?!1:!0:!1}function n(e){if(!e.cancel){d();var t=h(q),n=-1==t?null:q[t],r=t+1;r>=j&&(r=0);var a=o(e),f=a.elem,l="string"==typeof f?null:f.getAttribute("data-require");l=l?l.split(","):[];var p=-1!=e.url.toLowerCase().indexOf("/configurationpage?");return p&&(l.push("jqmpopup"),l.push("jqmcollapsible"),l.push("jqmcheckbox"),l.push("legacy/dashboard"),l.push("legacy/selectmenu"),l.push("jqmcontrolgroup")),(p||f.classList&&f.classList.contains("type-interior"))&&(l.push("jqmlistview"),l.push("scripts/notifications")),new Promise(function(o){require(l,function(){var p=q[r],d=p.querySelector(".page-view");d&&w(d);var v;"string"==typeof f?(p.innerHTML=f,v=p.querySelector(".page-view")):(a.hasScript?(p.innerHTML="",$(f).appendTo(p)):d?p.replaceChild(f,d):p.appendChild(f),i(l,f),v=f),b&&b(v,!1,e),s(q,r,t),u(p,n,e.transition,e.isBack).then(function(){P=r,L[r]=e.url,!e.cancel&&n&&c(q,r),document.dispatchEvent(new CustomEvent("scroll",{})),window.$&&($.mobile=$.mobile||{},$.mobile.activePage=v),o(v)})})})}}function i(e,t){for(var n=!1,i=0,r=e.length;r>i;i++)if(0==e[i].indexOf("jqm")){n=!0;break}n&&$(t).trigger("create")}function r(e,t,n){return e.split(t).join(n)}function a(e,t){t&&(e=r(e,"<!--<script","<script"),e=r(e,"</script>-->","</script>"));var n=document.createElement("div");return n.innerHTML=e,n.querySelector('div[data-role="page"]')}function o(e){if(-1==e.view.indexOf('data-role="page"')){var t='<div class="page-view" data-type="'+(e.type||"")+'">';return t+=e.view,t+="</div>"}var n=-1!=e.view.indexOf("<script"),i=a(e.view,n);return i.classList.add("page-view"),i.setAttribute("data-type",e.type||""),{elem:i,hasScript:n}}function s(e,t,n){for(var i=0,r=e.length;r>i;i++)t==i||n==i||e[i].classList.add("hide")}function c(e,t){for(var n=0,i=e.length;i>n;n++)t==n||e[n].classList.add("hide")}function u(e,n,i,r){if(t()&&n&&e.animate){if("slide"==i)return l(e,n,i,r);if("fade"==i)return p(e,n,i,r)}return f(e,n,i,r)}function f(e){return e.classList.remove("hide"),Promise.resolve()}function l(e,t,n,i){return new Promise(function(n){var r={duration:450,iterations:1,easing:"ease-out"},a=[];if(t){var o=i?"100%":"-100%";a.push(t.animate([{transform:"none",offset:0},{transform:"translate3d("+o+", 0, 0)",offset:1}],r))}e.classList.remove("hide");var s=i?"-100%":"100%";a.push(e.animate([{transform:"translate3d("+s+", 0, 0)",offset:0},{transform:"none",offset:1}],r)),C=a,a[a.length-1].onfinish=n})}function p(e,t){return new Promise(function(n){var i={duration:140,iterations:1,easing:"ease-out"},r=[];t&&r.push(t.animate([{opacity:1,offset:0},{opacity:0,offset:1}],i)),e.classList.remove("hide"),r.push(e.animate([{opacity:0,offset:0},{opacity:1,offset:1}],i)),C=r,r[r.length-1].onfinish=n})}function d(){for(var e=C,t=0,n=e.length;n>t;t++)v(e[t])}function v(e){try{e.cancel()}catch(t){}}function m(e){b=e}function h(){return P}function g(e){var t=e.url,n=L.indexOf(t);if(-1!=n){var i=q[n],r=i.querySelector(".page-view");if(r){if(e.cancel)return;d();var a=q[n],o=h(q),f=-1==o?null:q[o];return b&&b(r,!0,e),s(q,n,o),u(a,f,e.transition,e.isBack).then(function(){return P=n,!e.cancel&&f&&c(q,n),document.dispatchEvent(new CustomEvent("scroll",{})),window.$&&($.mobile=$.mobile||{},$.mobile.activePage=r),r})}}return Promise.reject()}function w(e){e.dispatchEvent(new CustomEvent("viewdestroy",{}))}function y(){L=[]}var b,q=document.querySelectorAll(".mainAnimatedPage"),L=[],j=q.length,E=!0,P=-1,C=[];return t()&&!document.documentElement.animate&&require(["webAnimations"]),{loadView:n,tryRestoreView:g,reset:y,setOnBeforeChange:m}});