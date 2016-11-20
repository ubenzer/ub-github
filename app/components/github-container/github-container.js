"use strict";

angular.module("app.github-container", [])
  .component("githubContainer", {
    templateUrl: "components/github-container/github-container.html",
    controller: function() {
      var ctrl = this;
      ctrl.username = null;
      ctrl.onUsernameSelected = function(username) {
        ctrl.username = username;
      }
    }
  });
