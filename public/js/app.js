(function (angular) {
  'use strict';

  /**
   * Configures the routes for our single-page application.
   */
  function RoutesConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController as mainCtrl'
      })
      .when('/access_token=:accessToken', {
        template: '',
        controller: 'TokenController as tokenCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  /**
   * Initialize our Angular app.
   */
  angular.module('implicitFlowTutorial', [
    'ngRoute',
    'ngStorage'
  ]).config(RoutesConfig);
})(window.angular);
