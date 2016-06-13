(function () {
  angular.module('app.package')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($futureStateProvider, $stateProvider, RouteHelpersProvider, PackageLoaderProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider.state('app.pkg', {
      url: '/pkg',
      abstract: true,
      template: helper.dummyTemplate,
    });
    $futureStateProvider.addResolve(function (PackageLoader) {
      "ngInject";

      return PackageLoader;
    });

    function deprecated() {
      $futureStateProvider
        .futureState({
          stateName: 'app.pkg',
          url: '/pkg',
          type: 'package',
        });

      $futureStateProvider.stateFactory('package', packageStateFactory);
    }

    /**
     * @ngInject
     */
    function packageStateFactory(futureState, PackageLoader) {


      return PackageLoader.then(function() {
        // If we return the files object here,
        // $futureStateProvider chokes.
      });
    }
  }
})();
