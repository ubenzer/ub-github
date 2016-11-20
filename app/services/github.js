"use strict";

angular.module("app.github-service", [])
  .service("Github", ["$http", "$q", function($http, $q) {
    // This function gets repo list from github and:
    // a. normalizes data
    // b. normalizes error message
    // so they can be used in application without worrying about
    // github's API schema.
    this.getRepositoryList = function(username) {
      return $http.get("https://api.github.com/users/" + username + "/repos")
        .then(function(data) {
          return data.data.map(function(aRepo) {
            return {
              name: aRepo.name,
              description: aRepo.description,
              url: aRepo.html_url
            }
          });
        })
        .catch(function(err) {
          if (err.status === 404) {
            return $q.reject({
              code: "X_NO_USER"
            });
          }
          return $q.reject({
            code: "API_ERROR"
          });
        });
    }
  }]);
