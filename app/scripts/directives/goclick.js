'use strict';

/**
 * @ngdoc directive
 * @name searchInterfaceApp.directive:goClick
 * @description
 * # goClick
 * Allows a button to be used for navigation
 * based off of the John David Miller's Stack Overflow Sample
 * http://stackoverflow.com/questions/15847726/is-there-a-simple-way-to-use-button-to-navigate-page-as-a-link-does-in-angularjs
 */
angular.module('searchInterfaceApp')
  .directive('goClick', function ($location) {
    return function (scope, element, attrs) {
        var path;

        attrs.$observe( 'goClick', function (val) {
            path = val;
        });

        element.bind( 'click', function() {
            scope.$apply( function () {
                $location.path( path );
            });
        });
    };
});
