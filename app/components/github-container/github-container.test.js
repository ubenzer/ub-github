"use strict";

describe("Github container directive", function() {
  var $rootScope, element, componentScope;

  beforeEach(module("app.github-container"));
  beforeEach(module("templates"));
  beforeEach(inject(function(_$rootScope_, $compile) {
    $rootScope = _$rootScope_;
    element = $compile("<github-container></github-container>")($rootScope);
    $rootScope.$digest();
    componentScope = element.isolateScope().$ctrl;
  }));

  it("renders properly", function() {
    expect(element[0].querySelectorAll("*").length).toBeGreaterThan(0);
    expect(element[0].querySelectorAll("github-repository-list").length).toEqual(0);
    componentScope.username = "xyz";
    $rootScope.$digest();
    expect(element[0].querySelectorAll("github-repository-list").length).toEqual(1);
  });

  it("updates username when notified about a new username selection", function() {
    expect(componentScope.username).toEqual(null);
    componentScope.onUsernameSelected("newUser");
    expect(componentScope.username).toEqual("newUser");
  });
});
