'use strict';

describe('Controller: PersonalityCtrl', function () {

  // load the controller's module
  beforeEach(module('brokersAdminApp'));

  var PersonalityCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonalityCtrl = $controller('PersonalityCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
