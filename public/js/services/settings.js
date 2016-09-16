(function (angular) {
  'use strict';

  function SettingsService($http, $q) {
    var service,
        settings;

    service = {};
    service.get = function (key) {
      return settings[key] || false;
    };
    service.getConfigFile = function () {
      var deferred = $q.defer();

      if (settings) {
        deferred.resolve(settings);
      } else {
        $http.get('/data/config.json').then(function (res) {
          settings = res.data;
          deferred.resolve(settings);
        }).catch(deferred.reject);
      }

      return deferred.promise;
    };

    return service;
  }

  angular.module('implicitFlowTutorial')
    .factory('SettingsService', SettingsService);
}(window.angular));
