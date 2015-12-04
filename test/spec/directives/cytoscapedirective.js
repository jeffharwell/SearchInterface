'use strict';

describe('Directive: cytoscapeDirective', function () {

  // load the directive's module
  beforeEach(module('searchInterfaceApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cytoscape-directive></cytoscape-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cytoscapeDirective directive');
  }));
});
