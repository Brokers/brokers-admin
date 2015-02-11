'use strict';

/**
 * @ngdoc service
 * @name brokersAdminApp.underscore
 * @description
 * # underscore
 * Factory in the brokersAdminApp.
 */
angular.module('brokersAdminApp')
  .factory('_', function ($window) {
    return $window._;
  });
