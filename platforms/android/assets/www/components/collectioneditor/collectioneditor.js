define(["dialogHelper","jQuery","paper-checkbox","paper-input","paper-icon-button-light"],function(e,t){function o(){Dashboard.showLoadingMsg();var e=t(this).parents(".dialog")[0],o=t("#selectCollectionToAddTo",e).val();return o?a(e,o):l(e),!1}function l(o){var l=ApiClient.getUrl("Collections",{Name:t("#txtNewCollectionName",o).val(),IsLocked:!t("#chkEnableInternetMetadata",o).checked(),Ids:t(".fldSelectedItemIds",o).val()||""});ApiClient.ajax({type:"POST",url:l,dataType:"json"}).then(function(t){Dashboard.hideLoadingMsg();var l=t.Id;e.close(o),n(l)})}function n(e){var t=getParameterByName("context");ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){Dashboard.navigate(LibraryBrowser.getHref(e,t))})}function a(o,l){var n=ApiClient.getUrl("Collections/"+l+"/Items",{Ids:t(".fldSelectedItemIds",o).val()||""});ApiClient.ajax({type:"POST",url:n}).then(function(){Dashboard.hideLoadingMsg(),e.close(o),require(["toast"],function(e){e(Globalize.translate("MessageItemsAdded"))})})}function i(){t(this).remove(),Dashboard.hideLoadingMsg()}function r(e){Dashboard.showLoadingMsg();var o=t("#selectCollectionToAddTo",e);t(".newCollectionInfo",e).hide();var l={Recursive:!0,IncludeItemTypes:"BoxSet",SortBy:"SortName"};ApiClient.getItems(Dashboard.getCurrentUserId(),l).then(function(e){var t="";t+='<option value="">'+Globalize.translate("OptionNewCollection")+"</option>",t+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),o.html(t).val("").trigger("change"),Dashboard.hideLoadingMsg()})}function c(){var e="";return e+='<form class="newCollectionForm" style="margin:auto;">',e+="<div>",e+=Globalize.translate("CreateCollectionHelp"),e+="</div>",e+='<div class="fldSelectCollection">',e+="<br/>",e+="<br/>",e+='<label for="selectCollectionToAddTo" class="selectLabel">'+Globalize.translate("LabelSelectCollection")+"</label>",e+='<select id="selectCollectionToAddTo" data-mini="true"></select>',e+="</div>",e+='<div class="newCollectionInfo">',e+="<div>",e+='<paper-input type="text" id="txtNewCollectionName" required="required" label="'+Globalize.translate("LabelName")+'"></paper-input>',e+='<div class="fieldDescription">'+Globalize.translate("NewCollectionNameExample")+"</div>",e+="</div>",e+="<br />",e+="<br />",e+="<div>",e+='<paper-checkbox id="chkEnableInternetMetadata">'+Globalize.translate("OptionSearchForInternetMetadata")+"</paper-checkbox>",e+="</div>",e+="</div>",e+="<br />",e+="<div>",e+='<button type="submit" class="clearButton" data-role="none"><paper-button raised class="submit block">'+Globalize.translate("ButtonOk")+"</paper-button></button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>"}function d(e,l){t("#selectCollectionToAddTo",e).on("change",function(){this.value?(t(".newCollectionInfo",e).hide(),t("#txtNewCollectionName",e).removeAttr("required")):(t(".newCollectionInfo",e).show(),t("#txtNewCollectionName",e).attr("required","required"))}),t(".newCollectionForm",e).off("submit",o).on("submit",o),t(".fldSelectedItemIds",e).val(l.join(",")),l.length?(t(".fldSelectCollection",e).show(),r(e)):(t(".fldSelectCollection",e).hide(),t("#selectCollectionToAddTo",e).html("").val("").trigger("change"))}function s(){var o=this;o.show=function(o){o=o||[];var l=e.createDialog({size:"small"});l.classList.add("ui-body-b"),l.classList.add("background-theme-b");var n="",a=Globalize.translate(o.length?"HeaderAddToCollection":"HeaderNewCollection");n+='<div class="dialogHeader" style="margin:0 0 2em;">',n+='<button is="paper-icon-button-light" class="btnCancel" tabindex="-1"><iron-icon icon="arrow-back"></iron-icon></button>',n+='<div class="dialogHeaderTitle">',n+=a,n+="</div>",n+='<a href="https://github.com/MediaBrowser/Wiki/wiki/Collections" target="_blank" tabindex="-1" class="clearLink" style="margin-left:auto;margin-right:.5em;display:inline-block;" title="'+Globalize.translate("ButtonHelp")+'"><paper-button class="accent" style="margin:0;font-weight:normal;font-size:13px;padding:.25em;display:flex;align-items:center;"><iron-icon icon="info"></iron-icon><span>'+Globalize.translate("ButtonHelp")+"</span></paper-button></a>",n+="</div>",n+=c(),l.innerHTML=n,document.body.appendChild(l),d(l,o),t(l).on("close",i),e.open(l),t(".btnCancel",l).on("click",function(){e.close(l)})}}return s});