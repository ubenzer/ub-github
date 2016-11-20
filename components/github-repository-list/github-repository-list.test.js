"use strict";

describe("Github repository list directive", function() {
  var $q, $rootScope, element, componentScope, Github, $compile;

  beforeEach(module("app.github-repository-list"));
  beforeEach(module("templates"));
  beforeEach(inject(function(_$rootScope_, _$q_, _$compile_, _Github_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    Github = _Github_;
    $compile = _$compile_;

    $rootScope.username = "ubenzer";
  }));

  it("renders properly", function() {
    sinon.stub(Github, "getRepositoryList").returns(mockRepositories(5));
    compile();
    expect(element[0].querySelectorAll("*").length).toBeGreaterThan(0);
  });

  describe("getRepositoryList", function() {
    it("shows error message on failure", function() {
      sinon.stub(Github, "getRepositoryList").returns(mockRepositoryError());
      compile();
      expect(componentScope.loading).toEqual(false);
      expect(componentScope.errorCode).toEqual("API_ERROR");
      expect(element[0].querySelectorAll(".github-repository-list__data").length).toEqual(0);
    });

    it("shows repositories on success", function() {
      sinon.stub(Github, "getRepositoryList").returns(mockRepositories(5));
      compile();
      expect(componentScope.loading).toEqual(false);
      expect(componentScope.errorCode).toEqual(null);
      expect(componentScope.repositories.length).toEqual(5);
      expect(element[0].querySelectorAll("github-repository").length).toEqual(5);
    });

    it("shows 'user has no repo' when necessary", function() {
      sinon.stub(Github, "getRepositoryList").returns(mockRepositories(0));
      compile();
      expect(componentScope.loading).toEqual(false);
      expect(componentScope.errorCode).toEqual(null);
      expect(componentScope.repositories.length).toEqual(0);
      expect(element[0].querySelectorAll("github-repository").length).toEqual(0);
      expect(element[0].querySelectorAll(".github-repository-list__data").length).toEqual(1);
    });
  });

  function compile() {
    element = $compile("<github-repository-list username='username'></github-repository-list>")($rootScope);
    $rootScope.$digest();
    componentScope = element.isolateScope().$ctrl;
  }

  function mockRepositories(howMany) {
    var repos = [];
    for (var i = 0; i < howMany; i++) {
      repos.push({name: "name " + i, description: "desc " + i, url: "url " + i});
    }
    return $q.when(repos)
  }

  function mockRepositoryError() {
    return $q.reject({code: "API_ERROR"});
  }
});
