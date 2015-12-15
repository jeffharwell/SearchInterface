'use strict';

/**
 * @ngdoc directive
 * @name searchInterfaceApp.directive:cytoscapeDirective
 * @description
 * # cytoscapeDirective
 */
angular.module('searchInterfaceApp')
  .directive('cytoscapeDirective', ['$rootScope','$window','mturkParameters','configuration','$http', 
     function ($rootScope, $window, mturkParameters, configuration, $http) {


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
            // Define our style
            scope.style = cytoscape.stylesheet()
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
                                'text-background-opacity': 0.75,
                                'text-valign': 'center',
                                'text-halign': 'center'
                             });
            scope.readyfunc = function() {
                    var cy = this;
                    cy.elements().unselectify();
                    cy.on('tap', 'node', function(e) {
                        var evtTarget = e.cyTarget;
                        var nodeId = evtTarget.id();
                        scope.cyClick({value:nodeId});
                    });
                };

            // build the graph
            console.debug('doCy called');
            //scope.elements.nodes = scope.cyNodes;
            //scope.elements.edges = scope.cyEdges;

            /*
             * Check of code that actually creates the cytoscape
             * graph which the directive is loaded.
             */
            scope.cy = cytoscape({
                container: $('#cy'),
                style: scope.style,
                ready: scope.readyfunc,
                elements: scope.cyNodes.concat(scope.cyEdges)
            }); // end #cy
            scope.params = {
                name: 'cola',
                animate: true,
                randomize: false,
                fit: true,
                nodeSpacing: 3,
                edgeLengthVal: 30,
                maxSimulationTime: 1500,
            };
            scope.layout = scope.cy.makeLayout(scope.params);
            scope.layout.run();
       
            // click and tell
            scope.cy.nodes().forEach(function(n){
                var g = n.data('id');
                n.on('tap', function() { 
                    console.debug('Node '+g+' was clicked');
                });
            });

            // A more proper name would be "reset the graph"
            // This resets the query graph to its initial onload
            // state.
            $rootScope.$on('reloadGraph', function() {
                console.debug('Reloading the graph!!');
                scope.layout.stop();
                scope.cy = cytoscape({
                    container: $('#cy'),
                    style: scope.style,
                    ready: scope.readyfunc,
                    elements: scope.cyNodes.concat(scope.cyEdges)
                });
                scope.layout = scope.cy.makeLayout(scope.params);
                scope.layout.run();
            });

            // This is the much overload appChanged function which,
            // if any data is passed, it will add those new nodes to 
            // the graph. Since we are not blowing out the layout
            // any more I'm not sure all this code is necessary
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

            $rootScope.$on('searchInitiated', function(event, queryDuration) {
                console.debug('Search Initiated, saving search graph to the database');
                // check to see if this is an MTurk HIT
                if (mturkParameters.isHit()) {

                    // Push the results to the grails backend
                    console.debug(configuration.backendurl);
                    var url = configuration.backendurl+'/recordResults';
                    var qdata = { assignmentid: mturkParameters.getAssignmentId(),
                                 hitid: mturkParameters.getHitId(),
                                 workerid: mturkParameters.getWorkerId(),
                                 query: {nodes:scope.cy.json(),
                                         queryduration: queryDuration
                                        }
                               };
                    //var jsonString = JSON.stringify({testdata: data});
                    $http.post(url, {testdata: qdata})
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
            });


            // Watch for window size changes and recalculate the cytoscape 
            // viewport. This allows us to use the graph window in a responsive
            // layout without breaking all the things.
            //
            // This is still a little bit 'hackie', the below might be a better
            // approach which would only resize on a bootstap breakpoint 
            // change ... hmm
            //
            // https://gist.github.com/porjo/8638530c53472e2b9d0c
            angular.element($window).bind('resize', function() {
                scope.cy.resize();
                scope.layout.run();
            });

        } // end of link
    }; // end of return
}]);

