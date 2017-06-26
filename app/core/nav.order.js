(function () {
  'use strict';

  angular
    .module('app.core')
    .config(NavOrderConfig)
    ;

  /**
   * @ngInject
   */
  function NavOrderConfig(NavProvider, RouteHelpersProvider) {
    NavProvider.order([
      'header',
      'dashboard',
      'user',
      'network',
      'hardware',
      'system',
    ]);
    NavProvider.group('header', {
      heading: "true",
      translate: "app.nav.heading.HEADER"
    });
    NavProvider.widget({
      templateUrl: RouteHelpersProvider.basepath('core/layout/todo.widget.html'),
    })
  }
})();
