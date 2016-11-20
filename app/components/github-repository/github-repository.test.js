"use strict";

describe("Github repository directive", function() {
  var $rootScope, element;

  beforeEach(module("app.github-repository"));
  beforeEach(module("templates"));
  beforeEach(inject(function(_$rootScope_, $compile) {
    $rootScope = _$rootScope_;
    $rootScope.repository = {
      url: "http://url",
      name: "repo name",
      description: "repo desc"
    };
    element = $compile("<github-repository repository='repository'></github-repository>")($rootScope);
    $rootScope.$digest();
  }));

  it("renders repository properly", function() {
    expect(element[0].querySelectorAll("*").length).toBeGreaterThan(0);
    expect(element[0].querySelector("a").textContent).toEqual("repo name");
    expect(element[0].querySelector("a").getAttribute("href")).toEqual("http://url");
    expect(element[0].querySelector(".github-repository__desc").textContent).toEqual("repo desc");
  });
});
