'use strict';

/**
 * @ngdoc function
 * @name searchInterfaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchInterfaceApp
 */
angular.module('searchInterfaceApp')
  .controller('MainCtrl', ['$routeParams','mturkParameters', '$location',  
    function ($routeParams, mturkParameters, $location) {
      console.debug($routeParams.assignmentId);
      console.debug($routeParams.hitId);
      console.debug($routeParams.workerId);
      console.debug($routeParams.turkSubmitTo);
      if ($routeParams.assignmentId && typeof $routeParams.assignmentId !== 'undefined') {
          mturkParameters.setParameters($routeParams);
      }
      if (!mturkParameters.isPreview()) {
          $location.path('/scenariothreelanding');
      }
  }]);
