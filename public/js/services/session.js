(function (angular) {
  'use strict';

  function SessionService($location, $sessionStorage, $window, SettingsService) {
    this.$storage = $sessionStorage;
    this.isAuthenticated = function () {
      try {
        if ($sessionStorage.token.access_token) {
          return true;
        }
      } catch (e) {
        return false;
      }
    };

    // Returns the access token from the token response.
    this.getAccessToken = function () {
      return $sessionStorage.token.access_token;
    };

    // Stores the token response with the front-end session.
    this.setToken = function (obj) {
      $sessionStorage.token = obj;
    };

    this.login = function () {
      delete $sessionStorage.token;
      $window.location.href = 'https://oauth2.sky.blackbaud.com/authorization' +
        '?client_id=' + SettingsService.get('SkyApiAppId') +
        '&response_type=token' +
        '&redirect_uri=' + SettingsService.get('AuthRedirectUri');
    };

    this.logout = function () {
      delete $sessionStorage.token;
      $location.path('/');
      $window.location.reload();
    };
  }

  angular.module('implicitFlowTutorial')
    .service('SessionService', SessionService);
}(window.angular));
