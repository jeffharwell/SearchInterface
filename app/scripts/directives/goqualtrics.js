'use strict';

/**
 * @ngdoc directive
 * @name searchInterfaceApp.directive:goQualtrics
 * @description
 * # goQualtrics
 * Allows a button to be used for navigation
 * based off of the John David Miller's Stack Overflow Sample
 * http://stackoverflow.com/questions/15847726/is-there-a-simple-way-to-use-button-to-navigate-page-as-a-link-does-in-angularjs
 */
angular.module('searchInterfaceApp')
  .directive('goQualtrics', ['$window', 'mturkParameters', function ($window, mturkParameters) {
    return function (scope, element, attrs) {
        var path;

        // go-qualtics in the directive should be set to the URL of the Qualtics survey we are wanting
        // to go to.
        attrs.$observe( 'goQualtrics', function (val) {
            path = val;
        });

        element.bind( 'click', function() {
            scope.$apply( function () {
                console.debug('You clicked on goQualtrics button');
                console.debug(path);
                // Add in the parameters from MTurk that we want to pass to Qualtrics
                var a = '&assignmentId='+mturkParameters.getAssignmentId()+'&hitId='+mturkParameters.getAssignmentId();
                a = a +'&workerId='+mturkParameters.getWorkerId()+'&turkSubmitTo='+mturkParameters.getTurkSubmitTo();
                console.debug(a);
                $window.location.href = path+a;
            });
        });
    };
}]);
