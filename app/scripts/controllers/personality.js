'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:PersonalityCtrl
 * @description
 * # PersonalityCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('PersonalityCtrl', function ($rootScope, $scope, $firebase, fbURL, $location, $routeParams) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }

    $scope.personalityCode = $routeParams.personalityId;

    var personalityRef = new Firebase(fbURL + '/report_information/personalities/' + $scope.personalityCode);
    var personalitySync = $firebase(personalityRef);

    $scope.personality = personalitySync.$asObject();



    $scope.remove = function() {
        if(window.confirm('Confirme que desea borrar esta personalidad.')) {
            $scope.personality.$remove().then(
                function() {
                    $location.path('/report_information/personalities');
                    window.alert('La personalidad se ha borrado exitosamente.');
                },
                function(error) {
                    window.alert('Error: ' + error);
                }
            );
        }
    };

    $scope.save = function() {
        $scope.personality.$save().then(
            function() {
                window.alert('Cambios salvados.');
            },
            function(error) {
                window.alert('Error: ' + error);
            }
        );
    };


  });
