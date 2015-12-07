'use strict';

/**
 * @ngdoc overview
 * @name searchInterfaceApp
 * @description
 * # searchInterfaceApp
 *
 * Main module of the application.
 */
angular
  .module('searchInterfaceApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'services.config'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/scenariothree', {
        templateUrl: 'views/scenariothree.html',
        controller: 'ScenarioThreeCtrl',
        controllerAs: 'scenariothree'
      })
      .when('/scenariothreelanding', {
          templateUrl: 'views/scenariothreelanding.html',
          controller: 'ScenarioThreeLandingCtrl',
          controllerAs: 'scenariothreelanding'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
