'use strict';

describe('Directive: goClick', function () {

  // load the directive's module
  beforeEach(module('searchInterfaceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<go-click></go-click>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the goClick directive');
  }));
});
