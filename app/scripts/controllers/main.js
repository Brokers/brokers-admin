'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('MainCtrl', function ($rootScope, $scope, $firebase, fbURL, $location) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }


    console.log(authData);
  });
