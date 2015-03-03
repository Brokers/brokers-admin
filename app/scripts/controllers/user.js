'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('UserCtrl', function ($rootScope, $scope, $firebase, fbURL, $location, $routeParams, _, $q) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }

    $scope.userCode = $routeParams.userId;

    var userRef = new Firebase(fbURL + '/users/' + $scope.userCode);
    var userSync = $firebase(userRef);

    $scope.user = userSync.$asObject();

    function updateUser() {
        $scope.companyId = $scope.user.company_id;
        // var companySync = $firebase(new Firebase(fbURL + '/companies/' + $scope.user.company_id));
        // $scope.company = companySync.$asObject();
    }
    $scope.user.$loaded(updateUser);
    $scope.user.$watch(updateUser);

    var companiesRef = new Firebase(fbURL + '/companies/');
    var companiesSync = $firebase(companiesRef);
    $scope.companies = companiesSync.$asObject();

    $scope.user.$loaded(function() {
        parseTests();
    });

    // Todo: Borrar de empresas, borrar código y borrar test.
    $scope.remove = function() {
        if(window.confirm('Confirme que desea borrar este usuario, no hay vuelta atras.')) {
            $firebase(
                new Firebase(fbURL + '/companies/' + $scope.user.company_id + '/staff/')
            ).$remove($scope.userCode)
                .then(function() {
                    if($scope.user.tests) {
                        var promises = [];
                        var testsSync = $firebase(new Firebase(fbURL + '/tests/'));

                        _($scope.user.tests).each(function(__, testId) {
                            promises.push(testsSync.$remove(testId));
                        });

                        return $q.all(promises);
                    } else {
                        return $q.when(true);
                    }
                })
                .then(function() {
                    if($scope.user.code) {
                        var codesSync = $firebase(new Firebase(fbURL + '/access_codes/'));
                        return codesSync.$remove($scope.user.code);
                    } else {
                        return $q.when(true);
                    }
                })
                .then(function() { return $scope.user.$remove(); })
                .then(function() {

                    $location.path('/users');
                    window.alert('El usuario se ha borrado exitosamente.');

                },
                function(error) {
                    window.alert('Error: ' + error);
                }
            );
        }
    };

    $scope.save = function() {
        function saveUser() {
            return $scope.user.$save().then(
                function() {
                    window.alert('Cambios salvados.');
                },
                function(error) {
                    window.alert('Error: ' + error);
                }
            );
        }

        if($scope.user.company_id !== $scope.companyId) {
            $firebase(
                new Firebase(fbURL + '/companies/' + $scope.user.company_id + '/staff/')
            ).$remove($scope.userCode)
            .then(function() {
                return $firebase(
                    new Firebase(fbURL + '/companies/' + $scope.companyId + '/staff/')
                ).$set($scope.userCode, true);
            }).then(function() {
                $scope.user.company_id = $scope.companyId;
                return saveUser();
            }, function(error) {
                window.alert(error);
            });

        } else {
            saveUser();
        }
        
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
