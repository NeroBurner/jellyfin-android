define(["events","libraryBrowser","imageLoader","cardBuilder"],function(e,t,r,n){return function(e,a,i){function o(e){var r=d(e),n=y[r];return n||(n=y[r]={query:{SortBy:"SortName",SortOrder:"Ascending",Fields:"PrimaryImageAspectRatio,SortName,SyncInfo",StartIndex:0,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",Limit:LibraryBrowser.getDefaultPageSize()},view:t.getSavedView(r)||"Poster"},n.query.ParentId=a.topParentId,t.loadSavedQueryValues(r,n.query)),n}function u(e){return o(e).query}function d(e){return e.savedQueryKey||(e.savedQueryKey=t.getSavedQueryKey("folders")),e.savedQueryKey}function l(e){Dashboard.showLoadingMsg();var a=u(e);ApiClient.getItems(Dashboard.getCurrentUserId(),a).then(function(o){function u(){a.StartIndex+=a.Limit,l(i)}function s(){a.StartIndex-=a.Limit,l(i)}window.scrollTo(0,0);var y,c,g=LibraryBrowser.getQueryPagingHtml({startIndex:a.StartIndex,limit:a.Limit,totalRecordCount:o.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!1,sortButton:!1,filterButton:!1}),m=n.getCardsHtml({items:o.Items,shape:"square",context:"folders",showTitle:!0,showParentTitle:!0,lazy:!0,centerText:!0,overlayPlayButton:!0}),f=i.querySelectorAll(".paging");for(y=0,c=f.length;c>y;y++)f[y].innerHTML=g;for(f=i.querySelectorAll(".btnNextPage"),y=0,c=f.length;c>y;y++)f[y].addEventListener("click",u);for(f=i.querySelectorAll(".btnPreviousPage"),y=0,c=f.length;c>y;y++)f[y].addEventListener("click",s);var S=i.querySelector(".itemsContainer");S.innerHTML=m,r.lazyChildren(S),t.saveQueryValues(d(e),a),Dashboard.hideLoadingMsg()})}var s=this,y={};s.getCurrentViewStyle=function(){return o(i).view},s.renderTab=function(){l(i)},s.destroy=function(){}}});