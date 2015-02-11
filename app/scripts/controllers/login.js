'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $firebase, fbURL, $location) {
    $scope.initWithSecret = function(secret) {
      var Firebase = window.Firebase;
      var mainRef = new Firebase(fbURL);

      mainRef.authWithCustomToken(secret, function(error, authData) {
        $scope.$apply(function () {
          if (error) {
            $rootScope.auth = false;
            window.alert('Login Failed!' + JSON.stringify(error));
          } else {
            $rootScope.auth = true;
            console.log(JSON.stringify(authData));
            $location.path('/index');
          }
        });
      });
    };

  });
