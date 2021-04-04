(function () {
  angular.module("app.system.template.suggested-change").config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state("app.system.template", {
        url: "/template",
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor("lang:template"),
      })
      .state("app.system.template.suggested-change", {
        url: "/suggested-change",
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state("app.system.template.suggested-change.view", {
        url: "/:id",
        title: "View Suggested Template Change",
        controller: "TemplateSuggestedChangeViewCtrl as vm",
        templateUrl: helper.basepath(
          "system/template/suggested-change/suggested-change.view.html"
        ),
        resolve: helper.resolveFor("codemirror", "after:mergely"),
      });

    helper.url.map(
      "template/suggested-change/?([0-9]*)",
      function ($state, id) {
        return "system/template/suggested-change" + (id && "/" + id);
      }
    );
  }
})();
