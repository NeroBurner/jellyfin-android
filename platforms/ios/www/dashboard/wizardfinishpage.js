define(["loading"],function(t){function e(){t.show(),ApiClient.ajax({url:ApiClient.getUrl("Startup/Complete"),type:"POST"}).then(function(){Dashboard.navigate("dashboard.html"),t.hide()})}return function(t){t.querySelector(".btnWizardNext").addEventListener("click",e)}});