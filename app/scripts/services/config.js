'use strict';

angular.module('services.config', [])
  .constant('configuration', {
    environment: 'production',
    backendurl: 'https://triple2.jeffharwell.com/apiservice/SearchInterface'
  });
