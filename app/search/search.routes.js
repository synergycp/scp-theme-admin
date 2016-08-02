(function () {
  'use strict';

  angular
    .module('app.search')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.search', {
        url: '/search?q',
        title: 'Search',
        controller: 'SearchCtrl as vm',
        templateUrl: helper.basepath('search/search.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'lang:hardware', 'lang:network',
          'lang:user'
        ),
      })
      ;
  }
})();
