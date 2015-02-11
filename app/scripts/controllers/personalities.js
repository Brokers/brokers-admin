'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:PersonalitiesCtrl
 * @description
 * # PersonalitiesCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('PersonalitiesCtrl', function ($rootScope, $scope, $firebase, fbURL, $location) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }

    var personalitiesRef = new Firebase(fbURL + '/report_information/personalities/');
    var personalitiesSync = $firebase(personalitiesRef);
    $scope.personalities = personalitiesSync.$asObject();

});
