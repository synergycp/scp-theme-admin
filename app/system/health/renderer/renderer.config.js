(function () {
  'use strict';

  angular
    .module('app.system.health.renderer')
    .config(configHealthStatusRenderers);

  /**
   * @ngInject
   */
  function configHealthStatusRenderers(
    HealthStatusRendererProvider,
    ConstantHealthStatusStateChangeRenderer,
    SimpleHealthStatusRenderer
  ) {
    HealthStatusRendererProvider.set(
      'http.ssl.disabled',
      ConstantHealthStatusStateChangeRenderer('app.system.setting.list')
    );
    HealthStatusRendererProvider.set(
      'package.update_available',
      ConstantHealthStatusStateChangeRenderer('app.system.package.list')
    );
    HealthStatusRendererProvider.set(
      'system.version.is_latest',
      SimpleHealthStatusRenderer(/** @ngInject */ function (SystemVersionModalService) {
        return SystemVersionModalService.update();
      })
    );
  }
})();
