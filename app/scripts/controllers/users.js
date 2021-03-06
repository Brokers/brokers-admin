'use strict';

/**
 * @ngdoc function
 * @name brokersAdminApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the brokersAdminApp
 */
angular.module('brokersAdminApp')
  .controller('UsersCtrl', function ($rootScope, $scope, $firebase, fbURL, $location) {
    var Firebase = window.Firebase;
    var mainRef = new Firebase(fbURL);
    var authData = mainRef.getAuth();
    if(authData === null) { $location.path('/login'); }

    var usersRef = new Firebase(fbURL + '/users/');
    var usersSync = $firebase(usersRef);
    $scope.users = usersSync.$asObject();

    var companiesRef = new Firebase(fbURL + '/companies/');
    var companiesSync = $firebase(companiesRef);
    $scope.companies = companiesSync.$asObject();

    function hydrateCompany() {
        $scope.users.forEach(function(user) {
            var companySync = $firebase(new Firebase(fbURL + '/companies/' + user.company_id));
            user.company = companySync.$asObject();
        });
    }
    $scope.users.$loaded(hydrateCompany);
    $scope.users.$watch(hydrateCompany);

    $scope.creatingUser = false;

    $scope.openCreateUserModal = function() {
        $scope.creatingUser = true;
        $scope.newUser = {
            'picture': '',
            'company_id': 'NOCOMPANY',
        };
    };

    $scope.closeCreateUserModal = function() {
        $scope.creatingUser = false;
    };

    $scope.createUser = function(newUser, newUserAsignCode) {
        var codeToken;
        usersSync.$push(newUser).then(function(userRef) {
            console.log('User created.');
            newUser.id = userRef.key();

            var userCompanyStaffRef = new Firebase(fbURL + '/companies/' + newUser['company_id'] + '/staff/');
            var userCompanyStaffSync = $firebase(userCompanyStaffRef);
            return userCompanyStaffSync.$set(newUser.id, true);
        }).then(function() {
            console.log('User added to company staff.');

            if(newUserAsignCode) {
                var codesRef = new Firebase(fbURL + '/access_codes/');
                var codesSync = $firebase(codesRef);
                var newCode = {
                    'user_id': newUser.id,
                    'expiration_date': -1,
                };

                //TODO: Chequear si ya existe el código
                codeToken = Date.now().toString(36).slice(-6).toUpperCase();

                return codesSync.$set(codeToken, newCode);
            } else {
                window.alert('Usuario creado.');
                $scope.openCreateUserModal();
            }
        }).then(function() {
            console.log('Token created.');

            var userRef = new Firebase(fbURL + '/users/' + newUser.id);
            var userSync = $firebase(userRef);
            return userSync.$set('code', codeToken);
        }).then(function() {

            window.alert('Creado usuario con token.');
            $scope.openCreateUserModal();
            
            return;
        }, function(error) {
            window.alert('Error: ' + error);
        });
    };
  });
