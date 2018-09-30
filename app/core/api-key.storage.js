(function () {
  'use strict';

  angular
    .module('app.core')
    .config(ApiKeyLocalStorageConfig)
    ;

  /**
   * @ngInject
   */
  function ApiKeyLocalStorageConfig(ApiKeyProvider) {
    ApiKeyProvider
      .setStorageEngine('ApiKeyLocalStorage')
      .setStorageKey('admin.apiKey')
      ;
  }
})();
