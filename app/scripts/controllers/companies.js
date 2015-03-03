'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:CompaniesCtrl
 * @description
 * # CompaniesCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('CompaniesCtrl', function ($rootScope, $scope, $firebase, fbURL, $location) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }

    var companiesRef = new Firebase(fbURL + '/companies/');
    var companiesSync = $firebase(companiesRef);
    $scope.companies = companiesSync.$asObject();

    function intersectStaffWUsers() {
        $scope.companies.forEach(function(company, id) {
            var staffSync = $firebase(Firebase.util.intersection(
                new Firebase(fbURL + '/companies/' + id + '/staff/'),
                new Firebase(fbURL + '/users/')
            ));
            company.staff = staffSync.$asObject();
        });
    }
    $scope.companies.$loaded(intersectStaffWUsers);
    $scope.companies.$watch(intersectStaffWUsers);

    $scope.creatingCompany = false;

    $scope.openCreateCompanyModal = function() {
        $scope.creatingCompany = true;
        $scope.newCompany = {
            'staff': [],
        };
    };

    $scope.closeCreateCompanyModal = function() {
        $scope.creatingCompany = false;
    };

    $scope.createCompany = function(newCompany) {
        companiesSync.$push(newCompany).then(function(companyRef) {
            console.log('Company created.');
            $scope.openCreateCompanyModal();
        }, function(error) {
            window.alert('Error: ' + error);
        });
    };
  });
