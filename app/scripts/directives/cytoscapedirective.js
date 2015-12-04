'use strict';

/**
 * @ngdoc directive
 * @name searchInterfaceApp.directive:cytoscapeDirective
 * @description
 * # cytoscapeDirective
 */
angular.module('searchInterfaceApp')
  .directive('cytoscapeDirective', function ($rootScope) {
    return {
        restrict: 'E',
        template: '<div id="cy"></div>', 
        replace: true,
        scope: {
            cyNodes: '=',
            cyEdges: '=',
            cyClick: '&'
        },
        //link: function(scope, element, attrs, fn) {
        link: function(scope) {
            // build the graph
            scope.doCy = function(){ // will be triggered by the event broadcast
                console.debug('doCy called');
                scope.elements = {};
                scope.elements.nodes = scope.cyNodes;
                scope.elements.edges = scope.cyEdges;

                $('#cy').cytoscape({
                    layout: {
                        name: 'circle',
                        fit: true,
                        ready: undefined,
                        stop: undefined,
                        padding: 5
                    },
                    style: cytoscape.stylesheet()
                        .selector('node')
                        .css({
                            'background-color': '#666',
                            'label': 'data(id)'
                        })
                        .selector('edge')
                        .css({
                            'width': 3,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle'}),
                    ready: function() {
                        var cy = this;
                        cy.elements().unselectify();
                        cy.on('tap', 'node', function(e) {
                            var evtTarget = e.cyTarget;
                            var nodeId = evtTarget.id();
                            scope.cyClick({value:nodeId});
                        });

                        cy.load(scope.elements);
                    }
                }); // end #cy
            }; // end of doCy

            // when the app object changes redraw the graph
            $rootScope.$on('appChanged', function() {
                scope.doCy();
            });

            scope.doCy(); // execute it once to create the initial graph
                          // without this the graph window loads empty

        } // end of link
    }; // end of return
});

