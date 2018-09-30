(function () {
  'use strict';

  angular
    .module('app.core')
    .config(configPackagesLoader)
    ;

  /**
   * @ngInject
   */
  function configPackagesLoader(PackagesLoaderProvider) {
    PackagesLoaderProvider
      .setApiBase('package/angular-admin')
      ;
  }
})();
