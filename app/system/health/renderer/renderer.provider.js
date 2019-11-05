(function () {
  'use strict';

  angular
    .module('app.system.health.renderer')
    .provider('HealthStatusRenderer', makeHealthStatusRendererProvider);

  /**
   * @ngInject
   */
  function makeHealthStatusRendererProvider(PromiseKeyValStoreProvider) {
    var HealthStatusRendererProvider = PromiseKeyValStoreProvider();
    return HealthStatusRendererProvider;
  }
})();
