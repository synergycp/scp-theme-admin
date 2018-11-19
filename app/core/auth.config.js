(function () {
  'use strict';

  angular
    .module('app.core')
    .config(AuthConfig)
    ;

  /**
   * @ngInject
   */
  function AuthConfig(AuthProvider) {
    AuthProvider
      .setUniqueField('username')
      .setLoginType('admin')
      ;
  }
})();
