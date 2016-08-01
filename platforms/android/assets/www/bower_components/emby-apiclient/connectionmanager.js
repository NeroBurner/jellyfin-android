define(["events","apiclient","appStorage"],function(e,n,r){var t={Unavailable:0,ServerSelection:1,ServerSignIn:2,SignedIn:3,ConnectSignIn:4,ServerUpdateNeeded:5},o={Local:0,Remote:1,Manual:2},s={getServerAddress:function(e,n){switch(n){case o.Local:return e.LocalAddress;case o.Manual:return e.ManualAddress;case o.Remote:return e.RemoteAddress;default:return e.ManualAddress||e.LocalAddress||e.RemoteAddress}}},c=function(c,i,a,u,d,l,v){function f(e,n){for(var r=0,t=n.length;t>r;r++)c.addOrUpdateServer(e,n[r]);return e}function p(e){e({State:t.Unavailable,ConnectUser:Z.connectUser()})}function I(e,n){e.Name=n.ServerName,e.Id=n.Id,n.LocalAddress&&(e.LocalAddress=n.LocalAddress),n.WanAddress&&(e.RemoteAddress=n.WanAddress),n.MacAddress&&(e.WakeOnLanInfos=[{MacAddress:n.MacAddress}])}function h(e,n){return e+"/emby/"+n}function m(e){var n=e.headers||{};"json"==e.dataType&&(n.accept="application/json");var r={headers:n,method:e.type,credentials:"same-origin"},t=e.contentType;return e.data&&("string"==typeof e.data?r.body=e.data:(r.body=S(e.data),t=t||"application/x-www-form-urlencoded; charset=UTF-8")),t&&(n["Content-Type"]=t),e.timeout?g(e.url,r,e.timeout):fetch(e.url,r)}function g(e,n,r){return new Promise(function(t,o){var s=setTimeout(o,r);n=n||{},n.credentials="same-origin",fetch(e,n).then(function(e){clearTimeout(s),t(e)},function(){clearTimeout(s),o()})})}function S(e){var n=[];for(var r in e){var t=e[r];null!==t&&void 0!==t&&""!==t&&n.push(encodeURIComponent(r)+"="+encodeURIComponent(t))}return n.join("&")}function T(e){if(!e)throw new Error("Request cannot be null");return e.headers=e.headers||{},m(e).then(function(n){return n.status<400?"json"==e.dataType||"application/json"==e.headers.accept?n.json():n:Promise.reject(n)},function(e){throw e})}function A(e,n){return e=h(e,"system/info/public"),T({type:"GET",url:e,dataType:"json",timeout:n||en})}function U(n){Y=n,e.trigger(Z,"connectusersignedin",[n])}function C(r,t){var o=Z.getApiClient(r.Id);if(!o){var c=s.getServerAddress(r,t);o=new n(c,i,a,u,d,v),_.push(o),o.serverInfo(r),o.onAuthenticated=function(e,n){w(e,n,{},!0)},e.trigger(Z,"apiclientcreated",[o])}return o}function w(e,n,r,t){var o=c.credentials(),s=o.Servers.filter(function(e){return e.Id==n.ServerId}),i=s.length?s[0]:e.serverInfo();r.updateDateLastAccessed!==!1&&(i.DateLastAccessed=(new Date).getTime()),i.Id=n.ServerId,t?(i.UserId=n.User.Id,i.AccessToken=n.AccessToken):(i.UserId=null,i.AccessToken=null),c.addOrUpdateServer(o.Servers,i),y(i,n.User),c.credentials(o),e.serverInfo(i),k(e,r),L(i,i.LastConnectionMode,n.User)}function y(e,n){var r={Id:n.Id,IsSignedInOffline:!0};c.addOrUpdateUser(e,r)}function k(e,n){n=n||{},n.reportCapabilities!==!1&&e.reportCapabilities(l),n.enableWebSocket!==!1&&!e.isWebSocketOpenOrConnecting()&&e.isWebSocketSupported()&&e.openWebSocket()}function L(n,r,t){C(n,r),e.trigger(Z,"localusersignedin",[t])}function E(e){return new Promise(function(n){Y&&Y.Id==e.ConnectUserId?n():e.ConnectUserId&&e.ConnectAccessToken?(Y=null,b(e.ConnectUserId,e.ConnectAccessToken).then(function(e){U(e),n()},function(){n()})):n()})}function P(e){return"https://connect.emby.media/service/"+e}function b(e,n){if(!e)throw new Error("null userId");if(!n)throw new Error("null accessToken");var r="https://connect.emby.media/service/user?id="+e;return T({type:"GET",url:r,dataType:"json",headers:{"X-Application":i+"/"+a,"X-Connect-UserToken":n}})}function M(e,n,r){if(!e.ExchangeToken)throw new Error("server.ExchangeToken cannot be null");if(!r.ConnectUserId)throw new Error("credentials.ConnectUserId cannot be null");var t=s.getServerAddress(e,n);return t=h(t,"Connect/Exchange?format=json&ConnectUserId="+r.ConnectUserId),T({type:"GET",url:t,dataType:"json",headers:{"X-MediaBrowser-Token":e.ExchangeToken}}).then(function(n){return e.UserId=n.LocalUserId,e.AccessToken=n.AccessToken,n},function(){return e.UserId=null,e.AccessToken=null,Promise.reject()})}function D(e,n){var r=s.getServerAddress(e,n);return T({type:"GET",url:h(r,"System/Info"),dataType:"json",headers:{"X-MediaBrowser-Token":e.AccessToken}}).then(function(t){return I(e,t),e.UserId?T({type:"GET",url:h(r,"users/"+e.UserId),dataType:"json",headers:{"X-MediaBrowser-Token":e.AccessToken}}).then(function(r){return L(e,n,r),Promise.resolve()},function(){return e.UserId=null,e.AccessToken=null,Promise.resolve()}):Promise.resolve()},function(){return e.UserId=null,e.AccessToken=null,Promise.resolve()})}function j(e){if(Y&&Y.ImageUrl)return{url:Y.ImageUrl};if(e&&e.PrimaryImageTag){var n=Z.getApiClient(e),r=n.getUserImageUrl(e.Id,{tag:e.PrimaryImageTag,type:"Primary"});return{url:r,supportsParams:!0}}return{url:null,supportsParams:!1}}function O(n){var r=n.serverInfo()||{},t={serverId:r.Id};return n.logout().then(function(){e.trigger(Z,"localusersignedout",[t])},function(){e.trigger(Z,"localusersignedout",[t])})}function N(e){if(!e.ConnectAccessToken||!e.ConnectUserId)return Promise.resolve([]);var n="https://connect.emby.media/service/servers?userId="+e.ConnectUserId;return T({type:"GET",url:n,dataType:"json",headers:{"X-Application":i+"/"+a,"X-Connect-UserToken":e.ConnectAccessToken}}).then(function(e){return e.map(function(e){return{ExchangeToken:e.AccessKey,ConnectServerId:e.Id,Id:e.SystemId,Name:e.Name,RemoteAddress:e.Url,LocalAddress:e.LocalAddress,UserLinkType:"guest"==(e.UserType||"").toLowerCase()?"Guest":"LinkedUser"}})},function(){return[]})}function X(e,n){return e.filter(function(e){return e.ExchangeToken?n.filter(function(n){return e.Id==n.Id}).length>0:!0})}function x(){return new Promise(function(e){var n=function(n){var r=n.map(function(e){var n={Id:e.Id,LocalAddress:R(e)||e.Address,Name:e.Name};return n.LastConnectionMode=n.ManualAddress?o.Manual:o.Local,n});e(r)};require(["serverdiscovery"],function(e){e.findServers(1e3).then(n,function(){n([])})})})}function R(e){if(e.Address&&e.EndpointAddress){var n=e.EndpointAddress.split(":")[0],r=e.Address.split(":");if(r.length>1){var t=r[r.length-1];isNaN(parseInt(t))||(n+=":"+t)}return B(n)}return null}function G(e,n){return(e||"").toLowerCase()==(n||"").toLowerCase()}function W(e,n){e=e.split("."),n=n.split(".");for(var r=0,t=Math.max(e.length,n.length);t>r;r++){var o=parseInt(e[r]||"0"),s=parseInt(n[r]||"0");if(s>o)return-1;if(o>s)return 1}return 0}function V(e,n,r,c,i){if(n>=e.length)return void p(i);var a=e[n],u=s.getServerAddress(r,a),d=!1,l=!1,v=en;return a==o.Local?(d=!0,v=8e3,G(u,r.ManualAddress)&&(l=!0)):a==o.Manual&&G(u,r.LocalAddress)&&(d=!0,v=8e3),l||!u?void V(e,n+1,r,c,i):void A(u,v).then(function(e){1==W(Z.minServerVersion(),e.Version)?i({State:t.ServerUpdateNeeded,Servers:[r]}):q(r,e,a,c,i)},function(){d?V(e,n+1,r,c,i):V(e,n+1,r,c,i)})}function q(e,n,r,t,o){var s=c.credentials();t=t||{},s.ConnectAccessToken&&t.enableAutoLogin!==!1?E(s).then(function(){e.ExchangeToken?M(e,r,s).then(function(){F(e,s,n,r,!0,t,o)},function(){F(e,s,n,r,!0,t,o)}):F(e,s,n,r,!0,t,o)}):F(e,s,n,r,!0,t,o)}function F(n,r,o,s,i,a,u){if(a=a||{},a.enableAutoLogin===!1)n.UserId=null,n.AccessToken=null;else if(i&&n.AccessToken&&a.enableAutoLogin!==!1)return void D(n,s).then(function(){F(n,r,o,s,!1,a,u)});I(n,o),n.LastConnectionMode=s,a.updateDateLastAccessed!==!1&&(n.DateLastAccessed=(new Date).getTime()),c.addOrUpdateServer(r.Servers,n),c.credentials(r);var d={Servers:[]};d.ApiClient=C(n,s),d.State=n.AccessToken&&a.enableAutoLogin!==!1?t.SignedIn:t.ServerSignIn,d.Servers.push(n),d.ApiClient.updateServerInfo(n,s),d.State==t.SignedIn&&k(d.ApiClient,a),u(d),e.trigger(Z,"connected",[d])}function z(e,n,r){var t=new RegExp(n,"ig");return e.replace(t,r)}function B(e){return e=e.trim(),0!=e.toLowerCase().indexOf("http")&&(e="http://"+e),e=z(e,"Http:","http:"),e=z(e,"Https:","https:")}function J(e,n,r){return e.split(n).join(r)}function H(e){return e=e||"",e=J(e,"&","&amp;"),e=J(e,"/","&#092;"),e=J(e,"!","&#33;"),e=J(e,"$","&#036;"),e=J(e,'"',"&quot;"),e=J(e,"<","&lt;"),e=J(e,">","&gt;"),e=J(e,"'","&#39;")}function K(e){return e=H(e),CryptoJS.MD5(e).toString()}function $(e){e.headers=e.headers||{},e.headers["X-Application"]=i+"/"+a}function Q(e){var n={type:"POST",url:P("pin/authenticate"),data:{deviceId:e.DeviceId,pin:e.Pin},dataType:"json"};return $(n),T(n)}var Y,Z=this,_=[],en=2e4;Z.connectUser=function(){return Y};var nn="3.0.5911";return Z.minServerVersion=function(e){return e&&(nn=e),nn},Z.appVersion=function(){return a},Z.capabilities=function(){return l},Z.deviceId=function(){return d},Z.credentialProvider=function(){return c},Z.connectUserId=function(){return c.credentials().ConnectUserId},Z.connectToken=function(){return c.credentials().ConnectAccessToken},Z.getServerInfo=function(e){var n=c.credentials().Servers;return n.filter(function(n){return n.Id==e})[0]},Z.getLastUsedServer=function(){var e=c.credentials().Servers;return e.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),e.length?e[0]:null},Z.getLastUsedApiClient=function(){var e=c.credentials().Servers;if(e.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),!e.length)return null;var n=e[0];return C(n,n.LastConnectionMode)},Z.addApiClient=function(n){_.push(n);var r=c.credentials().Servers.filter(function(e){return G(e.ManualAddress,n.serverAddress())||G(e.LocalAddress,n.serverAddress())||G(e.RemoteAddress,n.serverAddress())}),t=r.length?r[0]:{};if(t.DateLastAccessed=(new Date).getTime(),t.LastConnectionMode=o.Manual,t.ManualAddress=n.serverAddress(),n.serverInfo(t),n.onAuthenticated=function(e,n){w(e,n,{},!0)},!r.length){var s=c.credentials();s.Servers=[t],c.credentials(s)}e.trigger(Z,"apiclientcreated",[n]),t.Id||n.getPublicSystemInfo().then(function(e){var r=c.credentials();t.Id=e.Id,n.serverInfo(t),r.Servers=[t],c.credentials(r)})},Z.clearData=function(){Y=null;var e=c.credentials();e.ConnectAccessToken=null,e.ConnectUserId=null,e.Servers=[],c.credentials(e)},Z.getOrCreateApiClient=function(e){var n=c.credentials(),r=n.Servers.filter(function(n){return G(n.Id,e)});if(!r.length)throw new Error("Server not found: "+e);var t=r[0];return C(t,t.LastConnectionMode)},Z.user=function(e){return new Promise(function(n){function r(){var e=j(o);n({localUser:o,name:Y?Y.Name:o?o.Name:null,imageUrl:e.url,supportsImageParams:e.supportsParams})}function t(){e&&e.getCurrentUserId()?e.getCurrentUser().then(function(e){o=e,r()},r):r()}var o,s=c.credentials();!s.ConnectUserId||!s.ConnectAccessToken||e&&e.getCurrentUserId()?t():E(s).then(t,t)})},Z.isLoggedIntoConnect=function(){return Z.connectToken()&&Z.connectUserId()?!0:!1},Z.logout=function(){for(var n=[],r=0,t=_.length;t>r;r++){var o=_[r];o.accessToken()&&n.push(O(o))}return Promise.all(n).then(function(){for(var n=c.credentials(),r=n.Servers.filter(function(e){return"Guest"!=e.UserLinkType}),t=0,o=r.length;o>t;t++){var s=r[t];s.UserId=null,s.AccessToken=null,s.ExchangeToken=null;for(var i=s.Users||[],a=0,u=i.length;u>a;a++)i[a].IsSignedInOffline=!1}n.Servers=r,n.ConnectAccessToken=null,n.ConnectUserId=null,c.credentials(n),Y&&(Y=null,e.trigger(Z,"connectusersignedout"))})},Z.getSavedServers=function(){var e=c.credentials(),n=e.Servers.slice(0);return n.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),n},Z.getAvailableServers=function(){var e=c.credentials();return Promise.all([N(e),x()]).then(function(n){var r=n[0],t=n[1],o=e.Servers.slice(0);return f(o,t),f(o,r),o=X(o,r),o.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),e.Servers=o,c.credentials(e),o})},Z.connect=function(e){return Z.getAvailableServers().then(function(n){return Z.connectToServers(n,e)})},Z.getOffineResult=function(){},Z.connectToServers=function(e,n){if(1==e.length)return Z.connectToServer(e[0],n).then(function(e){return e.State==t.Unavailable&&(e.State=null==e.ConnectUser?t.ConnectSignIn:t.ServerSelection),e});var r=e.length?e[0]:null;return r?Z.connectToServer(r,n).then(function(n){return n.State==t.SignedIn?n:{Servers:e,State:e.length||Z.connectUser()?t.ServerSelection:t.ConnectSignIn,ConnectUser:Z.connectUser()}}):Promise.resolve({Servers:e,State:e.length||Z.connectUser()?t.ServerSelection:t.ConnectSignIn,ConnectUser:Z.connectUser()})},Z.connectToServer=function(e,n){return new Promise(function(r){var t=[];null!=e.LastConnectionMode,-1==t.indexOf(o.Manual)&&t.push(o.Manual),-1==t.indexOf(o.Local)&&t.push(o.Local),-1==t.indexOf(o.Remote)&&t.push(o.Remote),n=n||{},V(t,0,e,n,r)})},Z.connectToAddress=function(e,n){return new Promise(function(r,t){function s(){p(r)}return e?(e=B(e),void A(e,en).then(function(t){var c={ManualAddress:e,LastConnectionMode:o.Manual};I(c,t),Z.connectToServer(c,n).then(r,s)},s)):void t()})},Z.loginToConnect=function(e,n){return new Promise(function(r,t){return e&&n?void require(["cryptojs-md5"],function(){var o=K(n);T({type:"POST",url:"https://connect.emby.media/service/user/authenticate",data:{nameOrEmail:e,password:o},dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",headers:{"X-Application":i+"/"+a}}).then(function(e){var n=c.credentials();n.ConnectAccessToken=e.AccessToken,n.ConnectUserId=e.User.Id,c.credentials(n),U(e.User),r(e)},t)}):void t()})},Z.signupForConnect=function(e){var n=e.email,r=e.username,t=e.password,o=e.passwordConfirm;return new Promise(function(s,c){return n&&r&&t?o?t!=o?void c({errorCode:"passwordmatch"}):void require(["cryptojs-md5"],function(){var o=K(t),u={email:n,userName:r,password:o};e.grecaptcha&&(u.grecaptcha=e.grecaptcha),T({type:"POST",url:"https://connect.emby.media/service/register",data:u,dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",headers:{"X-Application":i+"/"+a,"X-CONNECT-TOKEN":"CONNECT-REGISTER"}}).then(s,function(e){try{return e.json()}catch(n){c()}}).then(function(e){e&&e.Status&&c({errorCode:e.Status})},c)}):void c({errorCode:"passwordmatch"}):void c({errorCode:"invalidinput"})})},Z.getApiClient=function(e){return e.ServerId&&(e=e.ServerId),_.filter(function(n){var r=n.serverInfo();return!r||r.Id==e})[0]},Z.getUserInvitations=function(){var e=Z.connectToken();if(!e)throw new Error("null connectToken");if(!Z.connectUserId())throw new Error("null connectUserId");var n="https://connect.emby.media/service/servers?userId="+Z.connectUserId()+"&status=Waiting";return T({type:"GET",url:n,dataType:"json",headers:{"X-Connect-UserToken":e,"X-Application":i+"/"+a}})},Z.deleteServer=function(e){if(!e)throw new Error("null serverId");var n=c.credentials().Servers.filter(function(n){return n.Id==e});return n=n.length?n[0]:null,new Promise(function(r){function t(){var n=c.credentials();n.Servers=n.Servers.filter(function(n){return n.Id!=e}),c.credentials(n),r()}if(!n.ConnectServerId)return void t();var o=Z.connectToken(),s=Z.connectUserId();if(!o||!s)return void t();var u="https://connect.emby.media/service/serverAuthorizations?serverId="+n.ConnectServerId+"&userId="+s;T({type:"DELETE",url:u,headers:{"X-Connect-UserToken":o,"X-Application":i+"/"+a}}).then(t,t)})},Z.rejectServer=function(e){var n=Z.connectToken();if(!e)throw new Error("null serverId");if(!n)throw new Error("null connectToken");if(!Z.connectUserId())throw new Error("null connectUserId");var r="https://connect.emby.media/service/serverAuthorizations?serverId="+e+"&userId="+Z.connectUserId();return fetch(r,{method:"DELETE",headers:{"X-Connect-UserToken":n,"X-Application":i+"/"+a}})},Z.acceptServer=function(e){var n=Z.connectToken();if(!e)throw new Error("null serverId");if(!n)throw new Error("null connectToken");if(!Z.connectUserId())throw new Error("null connectUserId");var r="https://connect.emby.media/service/ServerAuthorizations/accept?serverId="+e+"&userId="+Z.connectUserId();return T({type:"GET",url:r,headers:{"X-Connect-UserToken":n,"X-Application":i+"/"+a}})},Z.getRegistrationInfo=function(e,n){var t,o={serverId:n.serverInfo().Id,deviceId:Z.deviceId(),deviceName:u,appName:i,appVersion:a,embyUserName:""},s="regInfo-"+o.serverId,c=JSON.parse(r.getItem(s)||"{}");if(o.deviceId&&(new Date).getTime()-(c.lastValidDate||0)<2592e5){if(c.deviceId==o.deviceId)return Promise.resolve();t=T({url:"https://mb3admin.com/admin/service/registration/updateDevice?"+S({serverId:o.serverId,oldDeviceId:c.deviceId,newDeviceId:o.deviceId}),type:"POST"})}return t||(t=Promise.resolve()),t.then(function(){return n.getCurrentUser().then(function(e){return o.embyUserName=e.Name,T({url:"https://mb3admin.com/admin/service/registration/validateDevice?"+S(o),type:"POST"}).then(function(e){var n=e.status;return 200==n?(r.setItem(s,JSON.stringify({lastValidDate:(new Date).getTime(),deviceId:o.deviceId})),Promise.resolve()):401==n?Promise.reject():403==n?Promise.reject("overlimit"):Promise.reject()},function(e){throw e})})})},Z.createPin=function(){var e={type:"POST",url:P("pin"),data:{deviceId:d},dataType:"json"};return $(e),T(e)},Z.getPinStatus=function(e){var n={deviceId:e.DeviceId,pin:e.Pin},r={type:"GET",url:P("pin")+"?"+S(n),dataType:"json"};return $(r),T(r)},Z.exchangePin=function(e){return Q(e).then(function(e){var n=c.credentials();return n.ConnectAccessToken=e.AccessToken,n.ConnectUserId=e.UserId,c.credentials(n),E(n)})},Z};return{ConnectionState:t,ConnectionMode:o,ServerInfo:s,ConnectionManager:c}});