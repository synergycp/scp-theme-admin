(function () {
  "use strict";

  angular
    .module("app.system.health.renderer")
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
      "http.ssl.disabled",
      ConstantHealthStatusStateChangeRenderer("app.system.setting.list")
    );
    HealthStatusRendererProvider.set(
      "forward.gateway.status",
      ConstantHealthStatusStateChangeRenderer(
        "app.network.forward.gateway.list"
      )
    );
    HealthStatusRendererProvider.set(
      "package.update_available",
      ConstantHealthStatusStateChangeRenderer("app.system.package.list")
    );
    HealthStatusRendererProvider.set(
      "template.suggested_change",
      ConstantHealthStatusStateChangeRenderer(
        "app.system.template.suggested-change.list"
      )
    );
    HealthStatusRendererProvider.set(
      "system.version.is_latest",
      SimpleHealthStatusRenderer(
        /** @ngInject */ function (SystemVersionModalService) {
          return SystemVersionModalService.update();
        }
      )
    );
    HealthStatusRendererProvider.set(
      "cron.running",
      SimpleHealthStatusRenderer(
        /** @ngInject */ function (Modal) {
          return Modal.information("health.check.cron.running.modal").open()
            .result;
        }
      )
    );
  }
})();
