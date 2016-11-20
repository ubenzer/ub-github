"use strict";

angular.module("app.github-username-input", [])
  .component("githubUsernameInput", {
    templateUrl: "components/github-username-input/github-username-input.html",
    bindings: {
      onChange: "&?"
    },
    controller: [function() {
      var ctrl = this;
      ctrl.username = "";
      ctrl.onUsernameSelected = function() {
        ctrl.onChange({username: ctrl.username});
      }
    }]
  });
