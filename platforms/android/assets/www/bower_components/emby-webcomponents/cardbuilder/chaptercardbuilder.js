define(["datetime","imageLoader","connectionManager","itemShortcuts"],function(a,e,i,t){function r(a,e,t){var r="card scalableCard itemAction chapterCard",d=((a.MediaSources||[])[0]||{}).MediaStreams||[],o=d.filter(function(a){return"Video"==a.Type})[0]||{},s=(t.backdropShape||"backdrop")+"Card";o.Width&&o.Height&&o.Width/o.Height<=1.34&&(s=(t.squareShape||"square")+"Card"),r+=" "+s,(t.block||t.rows)&&(r+=" block");for(var c="",l=0,v=i.getApiClient(a.ServerId),m=0,u=e.length;u>m;m++){t.rows&&0==l&&(c+='<div class="cardColumn">');var p=e[m];c+=n(a,v,p,m,t,r),l++,t.rows&&l>=t.rows&&(l=0,c+="</div>")}return c}function d(a,e,i,t,r){return e.ImageTag?r.getScaledImageUrl(a.Id,{maxWidth:t,tag:e.ImageTag,type:"Chapter",index:i}):null}function n(e,i,t,r,n,o){var s=d(e,t,r,n.width||400,i),c="cardImageContainer chapterCardImageContainer";n.coverImage&&(c+=" coveredImage");var l=' data-action="play" data-isfolder="'+e.IsFolder+'" data-id="'+e.Id+'" data-serverid="'+e.ServerId+'" data-type="'+e.Type+'" data-mediatype="'+e.MediaType+'" data-positionticks="'+t.StartPositionTicks+'"',v=s?'<div class="'+c+' lazy" data-src="'+s+'">':'<div class="'+c+'">';s||(v+='<i class="md-icon cardImageIcon">local_movies</i>');var m="";m+='<div class="cardText">'+t.Name+"</div>",m+='<div class="cardText">'+a.getDisplayRunningTime(t.StartPositionTicks)+"</div>";var u='<button type="button" class="'+o+'"'+l+'> <div class="cardBox"><div class="cardScalable"><div class="cardPadder"></div><div class="cardContent">'+v+'</div><div class="innerCardFooter">'+m+"</div></div></div></div></button>";return u}function o(a,i,d){if(d.parentContainer){if(!document.body.contains(d.parentContainer))return;if(!i.length)return void d.parentContainer.classList.add("hide");d.parentContainer.classList.remove("hide")}var n=r(a,i,d);d.itemsContainer.innerHTML=n,e.lazyChildren(d.itemsContainer),t.off(d.itemsContainer),t.on(d.itemsContainer)}return{buildChapterCards:o}});