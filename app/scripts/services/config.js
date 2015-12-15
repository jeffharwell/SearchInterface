'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    environment: 'development',
    backendurl: 'http://triple2.jeffharwell.com/SearchInterface'
  });
