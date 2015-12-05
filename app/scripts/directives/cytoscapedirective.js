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
        link: function(scope) {
            // build the graph
            console.debug('doCy called');
            //scope.elements.nodes = scope.cyNodes;
            //scope.elements.edges = scope.cyEdges;

            scope.cy = cytoscape({
                container: $('#cy'),
                style: cytoscape.stylesheet()
                    .selector('node')
                    .css({
                        'background-color': '#666',
                        'label': 'data(name)',
                        'width': 'label',
                        'height': 'label',
                        'shape': 'rectangle'
                    })
                    .selector('edge')
                    .css({
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'})
                    .selector('.background')
                    .css({
                        'text-border-color': '#000',
                        'text-background-color': '#ccc',
                        'text-background-opacity': .75,
                        'text-valign': 'center',
                        'text-halign': 'center'
                     }),

                ready: function() {
                    var cy = this;
                    cy.elements().unselectify();
                    cy.on('tap', 'node', function(e) {
                        var evtTarget = e.cyTarget;
                        var nodeId = evtTarget.id();
                        scope.cyClick({value:nodeId});
                    });
                },
                elements: scope.cyNodes.concat(scope.cyEdges)
            }); // end #cy
            scope.params = {
                name: 'cola',
                animate: true,
                randomize: false,
                fit: true,
                nodeSpacing: 3,
                edgeLengthVal: 30,
                maxSimulationTime: 2000,
            };
            scope.layout = scope.cy.makeLayout(scope.params);
            scope.layout.run();
        
            scope.cy.nodes().forEach(function(n){
                var g = n.data('id');
                n.on('tap', function() { 
                    console.debug('Node '+g+' was clicked');
                });
            });

            $rootScope.$on('appChanged', function(event, data) {
                console.debug('Something changed!!');
                scope.layout.stop();
                if (data && data.length > 0) {
                    console.debug('Adding new node');
                    scope.cy.add(data);
                    scope.layout = scope.cy.makeLayout(scope.params);
                }
                //scope.layout = scope.cy.makeLayout(scope.params);
                scope.layout.run();
            });

        } // end of link
    }; // end of return
});

