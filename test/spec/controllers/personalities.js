'use strict';

describe('Controller: PersonalitiesCtrl', function () {

  // load the controller's module
  beforeEach(module('brokersAdminApp'));

  var PersonalitiesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonalitiesCtrl = $controller('PersonalitiesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
