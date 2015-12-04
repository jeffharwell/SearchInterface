'use strict';

/**
 * @ngdoc function
 * @name searchInterfaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the searchInterfaceApp
 */
angular.module('searchInterfaceApp')
  .controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
      var nodes = [ // Initial Graph Elements
          { // data points
              data: { id: 'a' }
          },
          {
              data: { id: 'b' }
          },
          {
              data: { id: 'c' }
          }
      ];

      var edges = [
          { // edges
              data: { id: 'ab', source: 'a', target: 'b' }
          },
          { 
              data: { id: 'bc', source: 'b', target: 'c' }
          }
      ];

      $scope.nodes = nodes;
      $scope.edges = edges;

      $scope.refresh = function() {
          console.debug('refreshing the graph');
          $rootScope.$broadcast('appChanged');
      };
      $scope.reset = function() {
          console.debug('resetting the graph');
          $scope.nodes = nodes;
          $scope.edges = edges;
          $rootScope.$broadcast('appChanged');
      };

      $scope.doClick = function(value)
      {
          console.debug('Click Click: '+value);
      };

  }]);
