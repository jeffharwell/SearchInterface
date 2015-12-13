'use strict';

/**
 * @ngdoc service
 * @name searchInterfaceApp.mturkParameters
 * @description
 * # mturkParameters
 * This service holdes the MTurk parameters that were passed to us as 
 * GET arguments. We need to hold onto these and pass them to the survey
 * software.
 *
 * Also, this service can tell us if we are being previewed by a Turker or not.
 */
angular.module('searchInterfaceApp')
  .service('mturkParameters', function () {
      var assignmentId = false;
      var hitId = false;
      var workerId = false;
      var turkSubmitTo = false;

      var setParameters = function(routeParams) {
          if (routeParams.assignmentId && typeof routeParams.assignmentId !== 'undefined') {
              assignmentId = routeParams.assignmentId;
          }
          if (routeParams.hitId && typeof routeParams.hitId !== 'undefined') {
              hitId = routeParams.hitId;
          }
          if (routeParams.workerId && typeof routeParams.workerId !== 'undefined') {
              workerId = routeParams.workerId;
          }
          if (routeParams.turkSubmitTo && typeof routeParams.turkSubmitTo !== 'undefined') {
              turkSubmitTo = routeParams.turkSubmitTo;
          }
      };

      var getAssignmentId = function() {
          return assignmentId;
      };

      var getHitId = function() {
          return hitId;
      };

      var getWorkerId = function() {
          return workerId;
      };

      var getTurkSubmitTo = function() {
          return turkSubmitTo;
      };

      var isPreview = function() {
          if (assignmentId && assignmentId === 'ASSIGNMENT_ID_NOT_AVAILABLE') {
              return true;
          } else {
              return false;
          }
      };

      return {
          setParameters: setParameters,
          getAssignmentId: getAssignmentId,
          getHitId: getHitId,
          getWorkerId: getWorkerId,
          getTurkSubmitTo: getTurkSubmitTo,
          isPreview: isPreview
      };
  });
