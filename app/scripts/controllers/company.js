'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('CompanyCtrl', function ($rootScope, $scope, $firebase, fbURL, $location, $routeParams) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }

    $scope.companyCode = $routeParams.companyId;

    var companyRef = new Firebase(fbURL + '/companies/' + $scope.companyCode);
    var companySync = $firebase(companyRef);
    $scope.company = companySync.$asObject();

    function intersectStaffWUsers() {
        var staffSync = $firebase(Firebase.util.intersection(
            new Firebase(fbURL + '/companies/' + $scope.companyCode + '/staff/'),
            new Firebase(fbURL + '/users/')
        ));
        $scope.staffList = staffSync.$asObject();
    }
    $scope.company.$loaded(intersectStaffWUsers);
    $scope.company.$watch(intersectStaffWUsers);

    $scope.save = function() {
        $scope.company.$save().then(
            function() {
                window.alert('Cambios salvados.');
            },
            function(error) {
                window.alert('Error: ' + error);
            }
        );
    };
  });
