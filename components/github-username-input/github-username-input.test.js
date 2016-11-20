"use strict";

describe("Github username input directive", function() {
  var $rootScope, element, componentScope;

  beforeEach(module("app.github-username-input"));
  beforeEach(module("templates"));
  beforeEach(inject(function(_$rootScope_, $compile) {
    $rootScope = _$rootScope_;
    element = $compile("<github-username-input on-change='changed(username)'></github-username-input>")($rootScope);
    $rootScope.$digest();
    componentScope = element.isolateScope().$ctrl;
  }));

  it("renders properly", function() {
    expect(element[0].querySelectorAll("*").length).toBeGreaterThan(0);
  });

  it("notifies outer world about user name selection via onChange binding", function(done) {
    $rootScope.changed = function(username) {
      expect(username).toEqual("ubenzer");
      done();
    };
    componentScope.username = "ubenzer";
    componentScope.onUsernameSelected();
    $rootScope.$digest();
  });
});
