(function (angular) {
  'use strict';

  /**
   * Retrieves constituent information from the Constituent API.
   */
  function ConstituentController($http, $timeout, SessionService, SettingsService) {
    var vm;

    vm = this;
    vm.isReady = false;
    vm.login = SessionService.login;

    $timeout(function () {
      $http({
        method: 'GET',
        url: 'https://api.sky.blackbaud.com/constituent/v1/constituents/' + vm.constituentId,
        headers: {
          'bb-api-subscription-key': SettingsService.get('SkyApiSubscriptionKey'),
          'Authorization': 'Bearer ' + SessionService.$storage.token.access_token
        }
      }).then(function (res) {
        vm.constituent = res.data;
        vm.isReady = true;
      }).catch(function () {
        vm.error = "The request to the Constituent API failed.";
        vm.isReady = true;
      });
    });
  }

  /**
   * Directive to print constituent details in the view.
   */
  function constituentDetail() {
    return {
      restrict: 'E',
      scope: true,
      controller: 'ConstituentController as constituentCtrl',
      templateUrl: '/partials/constituent-detail.html',
      bindToController: {
        'constituentId': '@'
      }
    };
  }

  angular.module('implicitFlowTutorial')
    .controller('ConstituentController', ConstituentController)
    .directive('constituentDetail', constituentDetail);
}(window.angular));
