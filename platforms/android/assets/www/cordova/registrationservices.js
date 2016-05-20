define(["jQuery","appSettings"],function(e,a){function n(e){return ConnectionManager.getRegistrationInfo(e,ApiClient)}function t(e){var t=IapManager.getProductInfo(e);if(t){var r="productpurchased-"+t.id;if(t.owned)return a.set(r,"1"),Promise.resolve();if("1"==a.get(r))return Promise.resolve()}var i=t?{enableAppUnlock:!0,id:t.id,price:t.price,feature:e}:null,o=browserInfo.android?"android":"ios";return IapManager.isUnlockedOverride(e).then(function(a){return a?Promise.resolve():IapManager.getSubscriptionOptions().then(function(a){return a.filter(function(e){return e.owned}).length>0?Promise.resolve():n(o+"appunlock").catch(function(){var n={title:Globalize.translate("HeaderUnlockApp"),enablePlayMinute:"playback"==e,feature:e};return p(a,i,n)})})})}function r(){var e=document.querySelector(".inAppPurchaseOverlay");e&&require(["dialogHelper"],function(a){a.close(e)})}function i(){v=[],y=null,k=null}function o(a,n,t,i,o,u){r(),v=n.slice(0),t&&v.push(t);var p=a.createDialog({size:"fullscreen-border"});p.classList.add("ui-body-b"),p.classList.add("background-theme-b");var d="";d+='<h2 class="dialogHeader">',d+='<paper-fab icon="arrow-back" mini class="btnCloseDialog" tabindex=-1""></paper-fab>',d+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+i.title+"</div>",d+="</h2>",d+='<div class="editorContent">',d+='<form style="max-width: 800px;margin:auto;">',d+='<p style="margin:2em 0;">',d+=Globalize.translate(t?"MessageUnlockAppWithPurchaseOrSupporter":"MessageUnlockAppWithSupporter"),d+="</p>",d+='<p style="margin:2em 0;">',d+=Globalize.translate("MessageToValidateSupporter"),d+="</p>";for(var b=!1,f=0,m=n.length;m>f;f++)b=!0,d+="<p>",d+='<paper-button raised class="submit block btnPurchase" data-email="true" data-feature="'+n[f].feature+'"><iron-icon icon="check"></iron-icon><span>',d+=n[f].buttonText,d+="</span></paper-button>",d+="</p>";if(t){b=!0;var g=Globalize.translate("ButtonUnlockWithPurchase");t.price&&(g=Globalize.translate("ButtonUnlockPrice",t.price)),d+="<p>",d+='<paper-button raised class="secondary block btnPurchase" data-feature="'+t.feature+'"><iron-icon icon="check"></iron-icon><span>'+g+"</span></paper-button>",d+="</p>"}b&&IapManager.enableRestore(i.feature,n,t)&&(d+="<p>",d+=browserInfo.safari?'<paper-button raised class="secondary block btnRestorePurchase subdued"><iron-icon icon="check"></iron-icon><span>'+Globalize.translate("ButtonRestorePreviousPurchase")+"</span></paper-button>":'<paper-button raised class="secondary block btnRestorePurchase subdued"><span>'+Globalize.translate("AlreadyPaid")+"</span></paper-button>",d+="</p>"),n.length&&(d+="<br/>",d+="<h1>"+Globalize.translate("HeaderBenefitsEmbyPremiere")+"</h1>",d+='<div class="paperList" style="margin-bottom:1em;">',d+=l().map(s).join(""),d+="</div>"),i.enablePlayMinute&&(d+="<p>",d+='<paper-button raised class="secondary block btnCloseDialog subdued"><iron-icon icon="play-arrow"></iron-icon><span>'+Globalize.translate("ButtonPlayOneMinute")+"</span></paper-button>",d+="</p>"),d+="</form>",d+="</div>",p.innerHTML=d,document.body.appendChild(p),c(p,i.feature,o,u),a.open(p),e(".btnCloseDialog",p).on("click",function(){a.close(p)}),p.addEventListener("close",function(){window.TabBar&&TabBar.show()}),p.classList.add("inAppPurchaseOverlay")}function l(){var e=[];return e.push({name:Globalize.translate("CoverArt"),icon:"photo",text:Globalize.translate("CoverArtFeatureDescription")}),e.push({name:Globalize.translate("HeaderFreeApps"),icon:"check",text:Globalize.translate("FreeAppsFeatureDescription")}),e.push(Dashboard.capabilities().SupportsSync?{name:Globalize.translate("HeaderMobileSync"),icon:"sync",text:Globalize.translate("MobileSyncFeatureDescription")}:AppInfo.isNativeApp?{name:Globalize.translate("HeaderCloudSync"),icon:"sync",text:Globalize.translate("CloudSyncFeatureDescription")}:{name:Globalize.translate("HeaderCinemaMode"),icon:"movie",text:Globalize.translate("CinemaModeFeatureDescription")}),e}function s(e){var a=!browserInfo.safari,n="";return n+="<paper-icon-item>",n+='<paper-fab mini style="background-color:#52B54B;" icon="'+e.icon+'" item-icon></paper-fab>',n+="<paper-item-body three-line>",a&&(n+='<a class="clearLink" href="https://emby.media/premiere" target="_blank">'),n+="<div>",n+=e.name,n+="</div>",n+='<div secondary style="white-space:normal;">',n+=e.text,n+="</div>",a&&(n+="</a>"),n+="</paper-item-body>",n+="</paper-icon-item>"}function c(a,n,t,r){h=!0,e(".btnPurchase",a).on("click",function(){h=!1,"true"==this.getAttribute("data-email")?d(this.getAttribute("data-feature")):IapManager.beginPurchase(this.getAttribute("data-feature"))}),e(".btnRestorePurchase",a).on("click",function(){h=!1,u()}),a.addEventListener("close",function(){i();var a=this;h?"playback"==n?Dashboard.alert({message:Globalize.translate("ThankYouForTryingEnjoyOneMinute"),title:Globalize.translate("HeaderTryPlayback"),callback:function(){r(),e(a).remove()}}):(r(),e(a).remove()):e(this).remove()})}function u(){require(["dialogHelper"],function(e){var a=e.createDialog({size:"fullscreen-border"});a.classList.add("ui-body-b"),a.classList.add("background-theme-b");var n="";n+='<h2 class="dialogHeader">',n+='<paper-fab icon="arrow-back" mini class="btnCloseDialog" tabindex=-1""></paper-fab>',n+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+Globalize.translate("ButtonRestorePreviousPurchase")+"</div>",n+="</h2>",n+='<div class="editorContent">',n+='<p style="margin:2em 0;">',n+=Globalize.translate("HowDidYouPay"),n+="</p>",n+="<p>",n+='<paper-button raised class="secondary block btnRestoreSub subdued"><span>'+Globalize.translate("IHaveEmbyPremiere")+"</span></paper-button>",n+="</p>",n+="<p>",n+='<paper-button raised class="secondary block btnRestoreUnlock subdued"><span>'+Globalize.translate("IPurchasedThisApp")+"</span></paper-button>",n+="</p>",n+="</div>",a.innerHTML=n,document.body.appendChild(a),e.open(a),a.querySelector(".btnCloseDialog").addEventListener("click",function(){e.close(a)}),a.querySelector(".btnRestoreSub").addEventListener("click",function(){e.close(a),Dashboard.alert({message:Globalize.translate("MessageToValidateSupporter"),title:Globalize.translate("TabEmbyPremiere")})}),a.querySelector(".btnRestoreUnlock").addEventListener("click",function(){e.close(a),IapManager.restorePurchase()})})}function p(e,a,n){return new Promise(function(t,r){require(["dialogHelper","paper-fab","paper-icon-item","paper-item-body"],function(i){window.TabBar&&TabBar.hide(),o(i,e,a,n,t,r),y=t,k=r})})}function d(e){if(ConnectionManager.isLoggedIntoConnect()){var a=ConnectionManager.connectUser();if(a&&a.Email)return void IapManager.beginPurchase(e,a.Email)}b(e)}function b(e){require(["prompt"],function(a){a({label:Globalize.translate("TextPleaseEnterYourEmailAddressForSubscription")}).then(function(a){a&&IapManager.beginPurchase(e,a)})})}function f(e,a){if(a.owned){var n=y;n&&v.filter(function(e){return a.id==e.id}).length&&(h=!1,r(),n())}}function m(){return n("Sync").catch(function(){return IapManager.getSubscriptionOptions().then(function(e){var a={title:Globalize.translate("HeaderUnlockSync"),feature:"sync"};return p(e,null,a)})})}function g(){Events.on(IapManager,"productupdated",f)}var h=!0,v=[],y=null,k=null;return window.RegistrationServices={renderPluginInfo:function(){},validateFeature:function(e){return"playback"==e?t(e):"livetv"==e?t(e):"sync"==e?m():Promise.resolve()}},browserInfo.android?requirejs(["cordova/android/iap"],g):requirejs(["cordova/iap"],g),window.RegistrationServices});