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
              data: { id: '1', name: 'what' }, classes: 'background'
          },
          {
              data: { id: '2', name: 'causes' }, classes: 'background'
          },
          {
              data: { id: '3', name: 'asthma' }, classes: 'background'
          }
      ];

      var edges = [
          { // edges
              data: { id: '1-2', source: '1', target: '2' }
          },
          { 
              data: { id: '2-3', source: '2', target: '3' }
          }
      ];

      $scope.refresh = function() {
          console.debug('refreshing the graph');
          $rootScope.$broadcast('appChanged');
      };
      $scope.reset = function() {
          console.debug('resetting the graph');
          $scope.nodes = nodes;
          $scope.edges = edges;
          resetIds();
          $rootScope.$broadcast('reloadGraph');
      };

      // Want to keep a list of the values, and ids of each node
      // so that we can intergrate new triples into the search graph
      var resetIds = function() {
          $scope.valueToId = {};
          $scope.nextId = 0;
          $scope.nodes.forEach(function(node) {
              $scope.valueToId[node.data.name] = node.data.id;
              if (node.data.id >= $scope.nextId) {
                  $scope.nextId = node.data.id + 1;
              }
          });
      };

      $scope.nodes = nodes;
      $scope.edges = edges;
      resetIds();

      // This function takes a given value of an element
      // and returns the id, it will give it a new id
      // if that element is not already on the graph
      var getElementId = function(value) {
          if (value !== '?' && value in $scope.valueToId) {
              return $scope.valueToId[value];
          } else {
              // It returns the current value before 
              // incrementing the value of nextId by 1
              var newId = $scope.nextId++;
              $scope.valueToId[value] = newId;
              console.debug('Assigning id '+newId+' to value '+value);
              return newId;
          }
      };

      // This function returns an "object" of the right form
      // to create node on the graph if passed to cytoscape
      var returnNodeObject = function(id, name) {
          return {data: {id: id, name: name}, classes: 'background'};
      };

      // Likewise this function returns an object that would links two id's together
      var returnEdgeObject = function(id1, id2) {
          return {data: { id: id1+'-'+id2, source: id1, target: id2 }};
      };

      $scope.addTriple = function() {
          console.debug('Trying to add a triple.');
          //$scope.nodes.push({data: {id: 'd'}});
          //$scope.edges.push({data: {id: 'cd', source: 'c', target: 'd'}});
          //var newnode = [ {data: { id: 'd'}, position: { x: 100, y: 100 }}, {data: { id: 'cd', source: 'c', target: 'd' }} ];
          //var newnode = [ {data: { id: 'd', name: 'some more'}, classes: 'background'}, {data: { id: 'cd', source: 'c', target: 'd' }} ];
          var subjectId = getElementId($scope.triple.subject);
          var predicateId = getElementId($scope.triple.predicate);
          var objectId = getElementId($scope.triple.object);
          var newnode = [ returnNodeObject(subjectId, $scope.triple.subject),
                          returnNodeObject(predicateId, $scope.triple.predicate),
                          returnNodeObject(objectId, $scope.triple.object),
                          returnEdgeObject(subjectId, predicateId),
                          returnEdgeObject(predicateId, objectId)
                        ];

          $rootScope.$broadcast('appChanged', newnode);
      };

  }]);
