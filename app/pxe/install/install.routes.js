(function () {
  angular.module("app.pxe.install").config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state("app.pxe.install", {
        url: "/install",
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state("app.pxe.install.list", {
        url: "?q",
        title: "OS Reloads",
        controller: "InstallIndexCtrl as vm",
        reloadOnSearch: false,
        templateUrl: helper.basepath("pxe/install/list/install.index.html"),
        resolve: helper.resolveFor("lang:os-reload", "lang:server"),
      });
  }
})();
