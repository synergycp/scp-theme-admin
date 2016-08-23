(function () {
  'use strict';

  angular
    .module('app.auth')
    .config(AuthConfig)
    ;

  /**
   * @ngInject
   */
  function AuthConfig(AuthProvider) {
    AuthProvider.setLoginType('admin');
  }
})();
