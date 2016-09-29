(function (angular) {
  'use strict';

  /**
   * Handles the authentication redirect
   * and parses token information from the URL hash.
   */
  function TokenController($location, SessionService) {
    var hash,
        hashArray,
        hashPairs;

    hash = $location.path().substr(1);
    hashArray = hash.split('&');
    hashPairs = {};

    hashArray.forEach(function (hash) {
      var obj = hash.split('=');
      hashPairs[obj[0]] = obj[1];
    });

    SessionService.setToken(hashPairs);
    $location.path('/');
  }

  angular.module('implicitFlowTutorial')
    .controller('TokenController', TokenController);
}(window.angular));
