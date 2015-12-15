'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    environment: '@@environment',
    backendurl: '@@backendurl'
  });
