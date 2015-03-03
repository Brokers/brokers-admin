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

    $scope.creatingPersonality = false;

    $scope.openCreatePersonalityModal = function() {
        $scope.creatingPersonality = true;
        $scope.newPersonality = {
            'reflexions': ['', ''],
        };
    };

    $scope.closeCreatePersonalityModal = function() {
        $scope.creatingPersonality = false;
    };

    $scope.createPersonality = function(newPersonality) {
        var code = newPersonality.code;
        delete newPersonality.code;
        personalitiesSync.$set(code, newPersonality).then(function(personalityRef) {
            console.log('Personality created.');
        }, function(error) {
            window.alert('Error: ' + error);
        });
    };
});
