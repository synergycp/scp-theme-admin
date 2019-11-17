(function () {
  'use strict';

  angular
    .module('app.system.health.renderer')
    .constant('ConstantHealthStatusStateChangeRenderer', ConstantHealthStatusStateChangeRenderer)
    .constant('PkgConstantHealthStatusStateChangeRenderer', PkgConstantHealthStatusStateChangeRenderer)
    .constant('SimpleHealthStatusRenderer', SimpleHealthStatusRendererFactory)
    .constant('PkgSimpleHealthStatusRenderer', PkgSimpleHealthStatusRendererFactory)
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
      'system.version.is_latest',
      SimpleHealthStatusRenderer(/** @ngInject */ function (SystemVersionModalService) {
        return SystemVersionModalService.update();
      })
    );
  }

  function ConstantHealthStatusStateChangeRenderer(state, i18nObjectCallback) {
    return SimpleHealthStatusRendererFactory(onClick, i18nObjectCallback);

    /**
     * @ngInject
     */
    function onClick($state) {
      $state.go(state);
    }
  }

  function PkgConstantHealthStatusStateChangeRenderer(pkg, state, i18nObjectCallback) {
    return PkgSimpleHealthStatusRendererFactory(pkg, onClick, i18nObjectCallback);

    /**
     * @ngInject
     */
    function onClick($state) {
      $state.go(state);
    }
  }

  function SimpleHealthStatusRendererFactory(onClickCallback, i18nObjectCallback) {
    /**
     * @ngInject
     * @param $q
     * @param $injector
     * @param healthCheck
     * @constructor
     */
    function SimpleHealthStatusRenderer($q, $injector, healthCheck) {
      var renderer = this;
      renderer.render = render;

      function render() {
        var i18nObject = $injector.invoke(i18nObjectCallback || inferI18nFromHealthCheckSlug, null, {
          healthCheck: healthCheck,
        });
        // Unwrap the promise if it returns one.
        return $q.when(i18nObject)
          .then(function (i18nObject) {
            return {
              i18n_key: i18nObject.key || i18nObject,
              i18n_params: i18nObject.params || healthCheck,
              onClick: onClick,
            };
          });
      }

      function onClick() {
        return $injector.invoke(onClickCallback, {healthCheck: healthCheck});
      }
    }

    SimpleHealthStatusRenderer.$get = function () {
      return SimpleHealthStatusRenderer;
    };
    return SimpleHealthStatusRenderer;
  }


  function PkgSimpleHealthStatusRendererFactory(packageName, onClickCallback, i18nObjectCallback) {
    return SimpleHealthStatusRendererFactory(onClickCallback, i18nObjectCallback || inferPkgI18nFromHealthCheckSlug);

    /** @ngInject */
    function inferPkgI18nFromHealthCheckSlug(healthCheck, RouteHelpers) {
      return RouteHelpers
        .package(packageName)
        .loadLang("admin:health")
        .then(function () {
          var slug = healthCheck.slug.replace('pkg.'+packageName+'.', '');
          return {
            key: 'pkg.' + packageName + '.admin.health.' + slug + '.' + healthCheck.status,
          };
        });
    }
  }

  /** @ngInject */
  function inferI18nFromHealthCheckSlug(healthCheck) {
    return {
      key: 'health.check.' + healthCheck.slug + '.' + healthCheck.status,
    };
  }
})();
