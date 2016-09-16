(function (angular) {
  'use strict';

  /**
   * Adds SessionService methods to the view.
   */
  function MainController(SessionService, SettingsService) {
    var vm;

    vm = this;
    vm.isAuthenticated = SessionService.isAuthenticated();
    vm.login = SessionService.login;
    vm.logout = SessionService.logout;

    SettingsService.getConfigFile().then(function () {
      vm.isReady = true;
    });
  }

  angular.module('implicitFlowTutorial')
    .controller('MainController', MainController);
}(window.angular));
