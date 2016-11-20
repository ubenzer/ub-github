"use strict";

angular.module("app.humanizeError", [])
  .constant("ErrorCodeLookup", {
    X_NO_USER: "User cannot be found!",
    API_ERROR: "Github is not reachable."
  })
  .filter("humanizeError", ["ErrorCodeLookup", function(ErrorCodeLookup) {
    return function(errorCode) {
      return ErrorCodeLookup[errorCode] || errorCode;
    }
  }]);
