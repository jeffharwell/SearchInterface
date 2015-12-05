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
              data: { id: 'a', name: 'testing' }, classes: 'background'
          },
          {
              data: { id: 'b', name: 'the' }, classes: 'background'
          },
          {
              data: { id: 'c', name: 'interface' }, classes: 'background'
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
      $scope.add = function() {
          //$scope.nodes.push({data: {id: 'd'}});
          //$scope.edges.push({data: {id: 'cd', source: 'c', target: 'd'}});
          //var newnode = [ {data: { id: 'd'}, position: { x: 100, y: 100 }}, {data: { id: 'cd', source: 'c', target: 'd' }} ];
          var newnode = [ {data: { id: 'd', name: 'some more'}, classes: 'background'}, {data: { id: 'cd', source: 'c', target: 'd' }} ];

          $rootScope.$broadcast('appChanged', newnode);
      };

  }]);
