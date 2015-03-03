'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('UserCtrl', function ($rootScope, $scope, $firebase, fbURL, $location, $routeParams, _) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }

    $scope.userCode = $routeParams.userId;

    var userRef = new Firebase(fbURL + '/users/' + $scope.userCode);
    var userSync = $firebase(userRef);

    $scope.user = userSync.$asObject();

    var companiesRef = new Firebase(fbURL + '/companies/');
    var companiesSync = $firebase(companiesRef);
    $scope.companies = companiesSync.$asObject();

    $scope.user.$loaded(function() {
        parseTests();
    });

    // Todo: Borrar de empresas, borrar código y borrar test.
    // $scope.remove = function() {
    //     if(window.confirm('Confirme que desea borrar este usuario, no hay vuelta atras.')) {
    //         $scope.user.$remove().then(
    //             function() {
    //                 $location.path('/users');
    //                 window.alert('El usuario se ha borrado exitosamente.');
    //             },
    //             function(error) {
    //                 window.alert('Error: ' + error);
    //             }
    //         );
    //     }
    // };

    $scope.save = function() {
        $scope.user.$save().then(
            function() {
                window.alert('Cambios salvados.');
            },
            function(error) {
                window.alert('Error: ' + error);
            }
        );
    };

    var parseTests = function() {
        console.log('Tests', $scope.user.tests);
        if($scope.user.tests) {
            var tests = _($scope.user.tests).keys();
            if(tests.length > 0) {
                $scope.testId = tests[0];
                var testSync = $firebase( new Firebase(fbURL + '/tests/' + $scope.testId) );
                $scope.test = testSync.$asObject();

                $scope.test.$loaded(function() {
                    console.log($scope.test);
                });
            }
        }
    };
  });
