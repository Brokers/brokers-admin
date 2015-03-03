'use strict';

/**
 * @ngdoc overview
 * @name brokersAdminApp
 * @description
 * # brokersAdminApp
 *
 * Main module of the application.
 */
angular
  .module('brokersAdminApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .value('fbURL', 'https://brokers.firebaseio.com/')
  .run(function($rootScope) {
    window.$rootScope = $rootScope;
    $rootScope.auth = false;
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/index', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/companies', {
        templateUrl: 'views/companies.html',
        controller: 'CompaniesCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl'
      })
      .when('/report_information/personalities', {
        templateUrl: 'views/personalities.html',
        controller: 'PersonalitiesCtrl'
      })
      .when('/report_information/personalities/:personalityId', {
        templateUrl: 'views/personality.html',
        controller: 'PersonalityCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  });
