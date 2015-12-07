'use strict';

/**
 * @ngdoc directive
 * @name searchInterfaceApp.directive:focusMe
 * @description
 * # focusMe
 * This directive allows you to listen for a specific
 * change in the dom and then set the focus an a specific
 * element.
 * Based on Mark Rajcok's answer to 
 * http://stackoverflow.com/questions/14833326/how-to-set-focus-on-input-field
 */
angular.module('searchInterfaceApp')
  .directive('focusMe', function () {
    return {
        scope: { trigger: '=focusMe' },
        link: function(scope, element) {
            scope.$watch('trigger', function(value) {
                if (value === true) {
                    element[0].focus();
                    scope.trigger = false;
                }
            });
        }
    };
  });
