(function () {
  angular
    .module("app.system.template.suggested-change.list")
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider.state("app.system.template.suggested-change.list", {
      url: "?q",
      title: "Suggested Template Changes",
      controller: "TemplateSuggestedChangeIndexCtrl as vm",
      templateUrl: helper.basepath(
        "system/template/suggested-change/list/list.index.html"
      ),
      reloadOnSearch: false,
    });
  }
})();
