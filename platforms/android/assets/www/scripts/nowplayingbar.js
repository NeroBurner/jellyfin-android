define(["datetime","userdataButtons","itemHelper","events","paper-icon-button-light"],function(e,t,n,i){function a(){var e="";return e+='<div class="nowPlayingBar hide">',e+='<div class="nowPlayingBarTop">',e+='<div class="nowPlayingBarPositionContainer sliderContainer">',e+='<input type="range" is="emby-slider" pin step=".1" min="0" max="100" value="0" class="nowPlayingBarPositionSlider"/>',e+="</div>",e+='<div class="nowPlayingBarInfoContainer">',e+='<div class="nowPlayingImage"></div>',e+='<div class="nowPlayingBarText"></div>',e+="</div>",e+='<div class="nowPlayingBarCenter">',e+='<button is="paper-icon-button-light" class="previousTrackButton mediaButton autoSize"><i class="md-icon">skip_previous</i></button>',e+='<button is="paper-icon-button-light" class="unpauseButton mediaButton autoSize"><i class="md-icon">play_arrow</i></button>',e+='<button is="paper-icon-button-light" class="pauseButton mediaButton autoSize"><i class="md-icon">pause</i></button>',e+='<button is="paper-icon-button-light" class="stopButton mediaButton autoSize"><i class="md-icon">stop</i></button>',e+='<button is="paper-icon-button-light" class="nextTrackButton mediaButton autoSize"><i class="md-icon">skip_next</i></button>',e+='<div class="nowPlayingBarCurrentTime"></div>',e+="</div>",e+='<div class="nowPlayingBarRight">',e+='<button is="paper-icon-button-light" class="muteButton mediaButton autoSize"><i class="md-icon">volume_up</i></button>',e+='<button is="paper-icon-button-light" class="unmuteButton mediaButton autoSize"><i class="md-icon">volume_off</i></button>',e+='<div class="sliderContainer nowPlayingBarVolumeSliderContainer hide" style="width:100px;vertical-align:middle;display:inline-flex;">',e+='<input type="range" is="emby-slider" pin step="1" min="0" max="100" value="0" class="nowPlayingBarVolumeSlider"/>',e+="</div>",e+='<button is="paper-icon-button-light" class="toggleRepeatButton mediaButton autoSize"><i class="md-icon">repeat</i></button>',e+='<div class="nowPlayingBarUserDataButtons">',e+="</div>",e+='<button is="paper-icon-button-light" class="unpauseButton mediaButton autoSize"><i class="md-icon">play_arrow</i></button>',e+='<button is="paper-icon-button-light" class="pauseButton mediaButton autoSize"><i class="md-icon">pause</i></button>',e+='<button is="paper-icon-button-light" class="remoteControlButton mediaButton autoSize"><i class="md-icon">tablet_android</i></button>',e+='<button is="paper-icon-button-light" class="playlistButton mediaButton autoSize"><i class="md-icon">queue_music</i></button>',e+="</div>",e+="</div>",e+="</div>"}function o(e){if(!e.classList.contains("hide")){var t=function(){e.classList.add("hide")};return!browserInfo.animate||browserInfo.mobile?void t():void requestAnimationFrame(function(){var n=[{transform:"translateY("+j+")",offset:0},{transform:"none",offset:1}],i={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(n,i).onfinish=t})}}function s(e){e.classList.contains("hide")&&(e.classList.remove("hide"),browserInfo.animate&&!browserInfo.mobile&&requestAnimationFrame(function(){var t=[{transform:"none",offset:0},{transform:"translateY("+j+")",offset:1}],n={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(t,n)}))}function r(){L&&L.pause()}function l(){L&&L.unpause()}function u(t){M=t.querySelector(".nowPlayingBarCurrentTime"),C=t.querySelector(".nowPlayingImage"),R=t.querySelector(".nowPlayingBarText"),q=t.querySelector(".nowPlayingBarUserDataButtons"),x=t.querySelector(".unmuteButton"),x.addEventListener("click",function(){L&&L.unMute()}),A=t.querySelector(".muteButton"),A.addEventListener("click",function(){L&&L.mute()}),t.querySelector(".stopButton").addEventListener("click",function(){L&&L.stop()});var n,i;for(D=t.querySelectorAll(".pauseButton"),n=0,i=D.length;i>n;n++)D[n].addEventListener("click",r);for(E=t.querySelectorAll(".unpauseButton"),n=0,i=E.length;i>n;n++)E[n].addEventListener("click",l);t.querySelector(".nextTrackButton").addEventListener("click",function(){L&&L.nextTrack()}),t.querySelector(".previousTrackButton").addEventListener("click",function(){L&&L.previousTrack()}),t.querySelector(".remoteControlButton").addEventListener("click",function(){c()}),t.querySelector(".playlistButton").addEventListener("click",function(){c(2)}),V=t.querySelector(".toggleRepeatButton"),V.addEventListener("click",function(){if(L){var e=_||{};switch((e.PlayState||{}).RepeatMode){case"RepeatAll":L.setRepeatMode("RepeatOne");break;case"RepeatOne":L.setRepeatMode("RepeatNone");break;default:L.setRepeatMode("RepeatAll")}}}),H=V.querySelector("i"),N=t.querySelector(".nowPlayingBarVolumeSlider"),z=t.querySelector(".nowPlayingBarVolumeSliderContainer"),AppInfo.hasPhysicalVolumeButtons?z.classList.add("hide"):z.classList.remove("hide"),N.addEventListener("change",function(){L&&L.setVolume(this.value)}),U=t.querySelector(".nowPlayingBarPositionSlider"),U.addEventListener("change",function(){if(L&&_){var e=parseFloat(this.value),t=e/100*_.NowPlayingItem.RunTimeTicks;L.seek(Math.floor(t))}}),U.getBubbleText=function(t){var n=_;if(!n||!n.NowPlayingItem||!n.NowPlayingItem.RunTimeTicks)return"--:--";var i=n.NowPlayingItem.RunTimeTicks;return i/=100,i*=t,e.getDisplayRunningTime(i)}}function c(e){Dashboard.navigate(e?"nowplaying.html?tab="+e:"nowplaying.html")}function d(){return O?Promise.resolve(O):new Promise(function(e){require(["itemShortcuts","css!css/nowplayingbar.css","emby-slider"],function(t){return(O=document.querySelector(".nowPlayingBar"))?void e(O):(document.body.insertAdjacentHTML("beforeend",a()),O=document.querySelector(".nowPlayingBar"),browserInfo.safari&&browserInfo.mobile&&O.classList.add("noMediaProgress"),t.on(O),u(O),void e(O))})})}function m(e){e.classList.remove("hide")}function g(e){e.classList.add("hide")}function p(e,t){return t.NowPlayingItem?O?void y(e,t):void d().then(function(){y(e,t)}):void B()}function y(t,n){if(P(),"positionchange"==t.type){var i=(new Date).getTime();if(700>i-Y)return;Y=i}_=n;var a,o,s=MediaController.getPlayerInfo(),r=n.PlayState||{};if(r.IsPaused){for(a=0,o=D.length;o>a;a++)g(D[a]);for(a=0,o=E.length;o>a;a++)m(E[a])}else{for(a=0,o=D.length;o>a;a++)m(D[a]);for(a=0,o=E.length;o>a;a++)g(E[a])}f(n,s);var l=n.NowPlayingItem||{};if(U&&!U.dragging){if(l.RunTimeTicks){var u=r.PositionTicks/l.RunTimeTicks;u*=100,U.value=u}else U.value=0;U.disabled=!r.CanSeek}var c=e.getDisplayRunningTime(r.PositionTicks);l.RunTimeTicks&&(c+=" / "+e.getDisplayRunningTime(l.RunTimeTicks)),M.innerHTML=c,h(n)}function f(e,t){t=t||MediaController.getPlayerInfo();var n=e.PlayState||{},i=t.supportedCommands,a=!0,o=!0,s=!0;-1==i.indexOf("Mute")&&(a=!1),-1==i.indexOf("Unmute")&&(o=!1),n.IsMuted?a=!1:o=!1,-1==i.indexOf("SetRepeatMode")?V.classList.add("hide"):V.classList.remove("hide"),"RepeatAll"==n.RepeatMode?(H.innerHTML="repeat",V.classList.add("repeatActive")):"RepeatOne"==n.RepeatMode?(H.innerHTML="repeat_one",V.classList.add("repeatActive")):(H.innerHTML="repeat",V.classList.remove("repeatActive")),-1==i.indexOf("SetVolume")&&(s=!1),t.isLocalPlayer&&AppInfo.hasPhysicalVolumeButtons&&(a=!1,o=!1,s=!1),a?m(A):g(A),o?m(x):g(x),N&&(s?z.classList.remove("hide"):z.classList.add("hide"),N.dragging||(N.value=n.VolumeLevel||0))}function v(e,t){t||(t=n.getDisplayName(e));var i='<button data-id="'+e.Id+'" data-type="'+e.Type+'" data-mediatype="'+e.MediaType+'" data-channelid="'+e.ChannelId+'" data-isfolder="'+e.IsFolder+'" type="button" class="itemAction textActionButton" data-action="link">';return i+=t,i+="</button>"}function h(e){R.innerHTML=MediaController.getNowPlayingNames(e.NowPlayingItem).map(function(e){return e.item?"<div>"+v(e.item,e.text)+"</div>":"<div>"+e.text+"</div>"}).join("");var n,i=80,a=e.NowPlayingItem;n=a.PrimaryImageTag?ApiClient.getScaledImageUrl(a.PrimaryImageItemId,{type:"Primary",height:i,tag:a.PrimaryImageTag}):a.BackdropImageTag?ApiClient.getScaledImageUrl(a.BackdropItemId,{type:"Backdrop",height:i,tag:a.BackdropImageTag,index:0}):a.ThumbImageTag?ApiClient.getScaledImageUrl(a.ThumbImageItemId,{type:"Thumb",height:i,tag:a.ThumbImageTag}):"TvChannel"==a.Type||"Recording"==a.Type?"css/images/items/detail/tv.png":"Audio"==a.MediaType?"css/images/items/detail/audio.png":"css/images/items/detail/video.png",n!=F&&(F=n,ImageLoader.lazyImage(C,n),a.Id?ApiClient.getItem(Dashboard.getCurrentUserId(),a.Id).then(function(e){q.innerHTML=t.getIconsHtml({item:e,includePlayed:!1})}):q.innerHTML="")}function b(e,t){var n=this;n.beginPlayerUpdates(),I.call(n,e,t)}function P(){d().then(s)}function B(){var e=document.getElementsByClassName("nowPlayingBar")[0];e&&o(e)}function T(e){var t=this;t.endPlayerUpdates(),B()}function I(e,t){var n=this;n.isDefaultPlayer&&t.NowPlayingItem&&"Video"==t.NowPlayingItem.MediaType||p(e,t)}function w(){L&&(i.off(L,"playbackstart",b),i.off(L,"playbackstop",T),i.off(L,"volumechange",S),i.off(L,"playstatechange",I),i.off(L,"positionchange",I),L.endPlayerUpdates(),L=null,B())}function S(){var e=this;Promise.all([e.getPlayerState(),d()]).then(function(t){var n=t[0];e.isDefaultPlayer&&n.NowPlayingItem&&"Video"==n.NowPlayingItem.MediaType||f(n)})}function k(e){w(),L=e,e.getPlayerState().then(function(t){t.NowPlayingItem&&e.beginPlayerUpdates(),I.call(e,{type:"init"},t)}),i.on(e,"playbackstart",b),i.on(e,"playbackstop",T),i.on(e,"volumechange",S),i.on(e,"playstatechange",I),i.on(e,"positionchange",I)}var L,M,C,R,q,x,A,N,z,E,D,U,V,H,_,O,F,j="-70px",Y=0;i.on(MediaController,"playerchange",function(){k(MediaController.getCurrentPlayer())}),k(MediaController.getCurrentPlayer())});