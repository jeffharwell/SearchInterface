'use strict';

/**
 * @ngdoc function
 * @name searchInterfaceApp.controller:ScenariothreelandingctrlCtrl
 * @description
 * # ScenariothreelandingctrlCtrl
 * Controller of the searchInterfaceApp
 */
angular.module('searchInterfaceApp')
  .controller('ScenarioThreeLandingCtrl', ['$routeParams', function ($routeParams) {
      console.debug($routeParams.test);
  }]);
