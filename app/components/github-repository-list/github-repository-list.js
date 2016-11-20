"use strict";

angular.module("app.github-repository-list", ["app.github-service", "app.humanizeError"])
  .component("githubRepositoryList", {
    templateUrl: "components/github-repository-list/github-repository-list.html",
    bindings: {
      username: "<"
    },
    controller: ["Github", function(Github) {
      var ctrl = this;

      // this is to distinguish between multiple ongoing promises
      // in case a slower repo list request might be overridden by
      // a new one
      var lastRequestId = 0;
      ctrl.$onChanges = function(changes) {
        if (changes.username) {
          ctrl.getRepositoryList(changes.username.currentValue);
        }
      };
      ctrl.loading = false;
      ctrl.repositories = [];
      ctrl.errorCode = null;

      ctrl.getRepositoryList = function(username) {
        lastRequestId++;
        var currentRequestId = lastRequestId;

        ctrl.loading = true;
        Github.getRepositoryList(username)
          .then(function(repositoryList) {
            if (currentRequestId !== lastRequestId) {
              // user typed another user name and this result is
              // useless
              return;
            }
            ctrl.loading = false;
            ctrl.repositories = repositoryList;
            ctrl.errorCode = null;
          })
          .catch(function(err) {
            if (currentRequestId !== lastRequestId) { return; }
            ctrl.loading = false;
            ctrl.errorCode = err.code;
          });
      }
    }]
  });
