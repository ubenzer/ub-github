"use strict";

describe("Github service", function() {
  var Github, $httpBackend;

  beforeEach(module("app.github-service"));
  beforeEach(inject(function(_Github_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    Github = _Github_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe("getRepositoryList", function() {
    it("returns normalized repo list", function(done) {
      $httpBackend.when("GET", "https://api.github.com/users/abc/repos")
        .respond([
          {
            name: "test repo 1",
            description: "test descr",
            html_url: "http://repo.url"
          },
          {
            name: "test repo 2",
            description: "test descr 2",
            html_url: "http://repo2.url"
          }]);

      Github.getRepositoryList("abc")
        .then(function(data) {
          expect(data.length).toEqual(2);
          expect(data[0].name).toEqual("test repo 1");
          expect(data[0].description).toEqual("test descr");
          expect(data[0].url).toEqual("http://repo.url");
          done();
        });

      $httpBackend.flush();
    });

    it("reports user not found error", function(done) {
      $httpBackend.when("GET", "https://api.github.com/users/abc/repos")
        .respond(404);

      Github.getRepositoryList("abc")
        .catch(function(err) {
          expect(err.code).toEqual("X_NO_USER");
          done();
        });

      $httpBackend.flush();
    });

    it("reports other errors as api error", function(done) {
      $httpBackend.when("GET", "https://api.github.com/users/abc/repos")
        .respond(-1); // angular returns -1 for connectivity problems

      Github.getRepositoryList("abc")
        .catch(function(err) {
          expect(err.code).toEqual("API_ERROR");
          done();
        });

      $httpBackend.flush();
    });
  });
});
