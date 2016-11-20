"use strict";

angular.module("app.github-repository", [])
  .component("githubRepository", {
    templateUrl: "components/github-repository/github-repository.html",
    bindings: {
      repository: "<"
    }
  });
