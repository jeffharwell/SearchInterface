'use strict';

describe('Service: graphData', function () {

  // load the service's module
  beforeEach(module('searchInterfaceApp'));

  // instantiate service
  var graphData;
  beforeEach(inject(function (_graphData_) {
    graphData = _graphData_;
  }));

  it('should do something', function () {
    expect(!!graphData).toBe(true);
  });

});
