"use strict";

module.exports = function(config) {
  config.set({
    preprocessors: {
      "**/*.html": ["ng-html2js"]
    },
    ngHtml2JsPreprocessor: {
      moduleName: "templates"
    },

    basePath: "./app",

    files: [
      "bower_components/angular/angular.js",
      "bower_components/angular-mocks/angular-mocks.js",
      "components/**/*.js",
      "components/**/*.html",
      "filters/**/*.js",
      "services/**/*.js"
    ],

    autoWatch: true,

    frameworks: ["jasmine", "sinon"],

    browsers: ["Chrome"],

    plugins: [
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-jasmine",
      "karma-junit-reporter",
      "karma-sinon",
      "karma-ng-html2js-preprocessor"
    ],

    junitReporter: {
      outputFile: "test_out/unit.xml",
      suite: "unit"
    }

  });
};
