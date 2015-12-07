'use strict';

describe('Controller: ScenariothreelandingctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('searchInterfaceApp'));

  var ScenariothreelandingctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScenariothreelandingctrlCtrl = $controller('ScenariothreelandingctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ScenariothreelandingctrlCtrl.awesomeThings.length).toBe(3);
  });
});
