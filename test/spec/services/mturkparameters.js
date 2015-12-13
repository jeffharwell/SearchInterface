'use strict';

describe('Service: mturkParameters', function () {

  // load the service's module
  beforeEach(module('searchInterfaceApp'));

  // instantiate service
  var mturkParameters;
  beforeEach(inject(function (_mturkParameters_) {
    mturkParameters = _mturkParameters_;
  }));

  it('should do something', function () {
    expect(!!mturkParameters).toBe(true);
  });

});
