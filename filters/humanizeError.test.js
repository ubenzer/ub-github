"use strict";

describe("humanizeError filter", function() {
  var $filter, ErrorCodeLookup;

  beforeEach(module("app.humanizeError"));
  beforeEach(inject(function(_$filter_, _ErrorCodeLookup_) {
    $filter = _$filter_;
    ErrorCodeLookup = _ErrorCodeLookup_;
  }));

  it("converts an error key to human readable form", function() {
    var humanizeError = $filter("humanizeError");
    expect(humanizeError("X_NO_USER")).toEqual(ErrorCodeLookup.X_NO_USER);
  });

  it("keeps original input if there is no translation available", function() {
    var humanizeError = $filter("humanizeError");
    expect(humanizeError("XYZ_HELLO_HELLO_ZYX")).toEqual("XYZ_HELLO_HELLO_ZYX");
  });
});
