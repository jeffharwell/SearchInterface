'use strict';

/**
 * @ngdoc function
 * @name searchInterfaceApp.controller:ScenarioThreeCtrl
 * @description
 * # ScenarioThreeCtrl
 * Controller of the searchInterfaceApp. This controller is for scenario three
 * where the users type in the elements of the predicate and they are rendered
 * on the graph.
 */
angular.module('searchInterfaceApp')
  .controller('ScenarioThreeCtrl', ['$scope', '$rootScope', '$location', '$anchorScroll', 'configuration', '$http', 'mturkParameters',
    function ($scope, $rootScope, $location, $anchorScroll, configuration, $http, mturkParameters) {
       // State of the interface buttons
      $scope.disableBtns = function() {
          $scope.searchbtnDisabled = true;
          $scope.sobtnDisabled = true;
          $scope.addbtnDisabled = true;
          $scope.resetbtnDisabled = true;
          $scope.addbtnDisabled = true;
          $scope.subDisabled = true;
          $scope.predDisabled = true;
          $scope.objDisabled = true;
      };
      $scope.enableBtns = function() {
          $scope.searchbtnDisabled = false;
          $scope.sobtnDisabled = false;
          $scope.addbtnDisabled = false;
          $scope.resetbtnDisabled = false;
          $scope.addbtnDisabled = false;
          $scope.subDisabled = false;
          $scope.predDisabled = false;
          $scope.objDisabled = false;
      };
      // Start with the buttons enabled
      $scope.enableBtns();
      // Except the search
      $scope.searchbtnDisabled = true;
      // Start with the survey button disabled
      $scope.surveyDisabled = true;
      // Start with the instructions button enabled
      $scope.hideInstructions = false;
      // Start with the focus on the subject entry box
      $scope.focusSubject = true;

      // Get the query start time
      $scope.queryStart = new Date();

      var nodes = [];
      /*
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
      */

      var edges = [];
      /*
      var edges = [
          { // edges
              data: { id: '1-2', source: '1', target: '2' }
          },
          { 
              data: { id: '2-3', source: '2', target: '3' }
          }
      ];
      */

      $scope.refresh = function() {
          console.debug('refreshing the graph');
          $rootScope.$broadcast('appChanged');
      };
      $scope.reset = function() {
          console.debug('resetting the graph');
          $scope.nodes = nodes;
          $scope.edges = edges;
          $scope.searchbtnDisabled = true; // disable search until there are nodes
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
          if (!value || value.trim() === '') {
              // The box was empty .. presumable
              return null;
          } else if (value !== '?' && value in $scope.valueToId) {
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

      /*
       * When the user hits the search button this function orchestrates
       * the apps response
       */
      $scope.search = function() {
        console.debug('Starting a search');
        // Calculate how long it took the user to create the query
        var now = new Date();
        var queryDuration = now - $scope.queryStart;
        // Make a broadcast so that the graph directive can
        // act appropriately.
        $rootScope.$broadcast('searchInitiated', queryDuration);
        $scope.template = 'searchresults';
        $scope.disableBtns();

        // Allow them to go on to the survey
        $scope.surveyDisabled = false;
        $scope.surveyContinue= {'background-color':'red'};
        $scope.hideInstructions = true;

        // if you don't put the old hash back it screws up
        // the routing and breaks the app :(
        var old = $location.hash();
        $location.hash('searchresultscontainer');
        $anchorScroll();
        $location.hash(old);

        // check to see if this is an MTurk HIT
        if (mturkParameters.isHit()) {

            // Push the results to the grails backend
            console.debug(configuration.backendurl);
            var url = configuration.backendurl+'/recordResults';
            var data = { assignmentid: mturkParameters.getAssignmentId(),
                         hitid: mturkParameters.getHitId(),
                         workerid: mturkParameters.getWorkerId(),
                         query: {nodes:'node structure',
                                 queryduration: 15
                                }
                       };
            //var jsonString = JSON.stringify({testdata: data});
            $http.post(url, {testdata: data})
                .then(
                 function(response) {
                     console.debug('Got stuff back');
                     console.debug(response);
                 },
                 function(response) {
                     console.debug('Error');
                     console.debug(response);
                 });
        }
      };

      /*
       * Function that takes the triple elements entered in the layout and figures out
       * how to pass them to the graph library so that it "does the right thing".
       */
      $scope.addTriple = function() {
          console.debug('Trying to add a triple.');
          //$scope.nodes.push({data: {id: 'd'}});
          //$scope.edges.push({data: {id: 'cd', source: 'c', target: 'd'}});
          //var newnode = [ {data: { id: 'd'}, position: { x: 100, y: 100 }}, {data: { id: 'cd', source: 'c', target: 'd' }} ];
          //var newnode = [ {data: { id: 'd', name: 'some more'}, classes: 'background'}, {data: { id: 'cd', source: 'c', target: 'd' }} ];
          if (($scope.triple !== null)) {
              var subjectId = getElementId($scope.triple.subject);
              var predicateId = getElementId($scope.triple.predicate);
              var objectId = getElementId($scope.triple.object);
              var newnode = [];
              if (subjectId !== null) {
                  newnode.push(returnNodeObject(subjectId, $scope.triple.subject));
              }
              if (predicateId !== null) {
                  newnode.push(returnNodeObject(predicateId, $scope.triple.predicate));
              }
              if (objectId !== null) {
                  newnode.push(returnNodeObject(objectId, $scope.triple.object));
              }
              if (subjectId !== null && predicateId !== null) {
                  newnode.push(returnEdgeObject(subjectId, predicateId));
              }
              if (predicateId !== null && objectId !== null) {
                  newnode.push(returnEdgeObject(predicateId, objectId));
              }

              /*
              var newnode = [ returnNodeObject(subjectId, $scope.triple.subject),
                              returnNodeObject(predicateId, $scope.triple.predicate),
                              returnNodeObject(objectId, $scope.triple.object),
                              returnEdgeObject(subjectId, predicateId),
                              returnEdgeObject(predicateId, objectId)
                            ];
              */
              if (newnode.length > 0) {
                  $rootScope.$broadcast('appChanged', newnode);
                  // Ok, now you can actually search
                  $scope.searchbtnDisabled = false;
              }
              $scope.triple.subject = '';
              $scope.triple.predicate = '';
              $scope.triple.object = '';
          }
      };

  }]);
