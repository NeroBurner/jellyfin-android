define(["components/paperdialoghelper","paper-dialog","paper-input","paper-fab","paper-item-body","paper-icon-item"],function(e){function t(){if(0==m.length)return Dashboard.alert({message:Globalize.translate("PleaseAddAtLeastOneFolder")}),!1;var t=this,n=$(t).parents("paper-dialog")[0],a=$("#txtValue",t).val(),i=$("#selectCollectionType",t).val();return"mixed"==i&&(i=null),ApiClient.addVirtualFolder(a,i,f.refresh,m).then(function(){u=!0,e.close(n)},function(){Dashboard.alert(Globalize.translate("ErrorAddingMediaPathToVirtualFolder"))}),!1}function n(e){return e.filter(function(e){return e.isSelectable!==!1}).map(function(e){return'<option value="'+e.value+'">'+e.name+"</option>"}).join("")}function a(e,a){$("#selectCollectionType",e).html(n(a)).val("").on("change",function(){if("mixed"!=this.value){var e=$(this).parents("paper-dialog")[0],t=this.selectedIndex;if(-1!=t){var n=this.options[t].innerHTML.replace("*","").replace("&amp;","&"),i=this.value;$("#txtValue",e).val(n);var r=a.filter(function(e){return e.value==i})[0];$(".collectionTypeFieldDescription",e).html(r.message||"")}}}),$(".btnAddFolder",e).on("click",i),$("form",e).off("submit",t).on("submit",t)}function i(){var e=$(this).parents(".editorContent")[0];require(["directorybrowser"],function(t){var n=new t;n.show({callback:function(t){t&&l(e,t),n.close()}})})}function r(e,t){var n="";return n+='<paper-icon-item role="menuitem" class="lnkPath">',n+='<paper-fab mini style="background:#52B54B;" icon="folder" item-icon></paper-fab>',n+="<paper-item-body>",n+=e,n+="</paper-item-body>",n+='<paper-icon-button icon="remove-circle" class="btnRemovePath" data-index="'+t+'"></paper-icon-button>',n+="</paper-icon-item>"}function o(e){var t=m.map(r).join(""),n=e.querySelector(".folderList");n.innerHTML=t,t?n.classList.remove("hide"):n.classList.add("hide"),$(e.querySelectorAll(".btnRemovePath")).on("click",s)}function l(e,t){0==m.filter(function(e){return e.toLowerCase()==t.toLowerCase()}).length&&(m.push(t),o(e))}function s(){var e=this,t=parseInt(e.getAttribute("data-index")),n=m[t];m=m.filter(function(e){return e.toLowerCase()!=n.toLowerCase()});var a=$(this).parents(".editorContent")[0];o(a)}function c(){$(this).remove(),Dashboard.hideLoadingMsg(),p.resolveWith(null,[u])}function d(){var t=this;t.show=function(t){var n=DeferredBuilder.Deferred();f=t,p=n,u=!1;var i=new XMLHttpRequest;return i.open("GET","components/medialibrarycreator/medialibrarycreator.template.html",!0),i.onload=function(){var n=this.response,i=e.createDialog({size:"small",theme:"a",modal:!1}),r="";r+='<h2 class="dialogHeader">',r+='<paper-fab icon="arrow-back" mini class="btnCloseDialog"></paper-fab>';var l=Globalize.translate("ButtonAddMediaLibrary");r+='<div style="display:inline-block;margin-left:.6em;vertical-align:middle;">'+l+"</div>",r+="</h2>",r+='<div class="editorContent" style="max-width:800px;margin:auto;">',r+=Globalize.translateDocument(n),r+="</div>",i.innerHTML=r,document.body.appendChild(i);var s=i.querySelector(".editorContent");a(s,t.collectionTypeOptions),$(i).on("iron-overlay-closed",c),e.open(i),$(".btnCloseDialog",i).on("click",function(){e.close(i)}),m=[],o(s)},i.send(),n.promise()}}var p,u,f,m=[];return d});