(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .config(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(NavProvider) {
    NavProvider.group('dashboard', {
      translate: "nav.DASH",
      sref: "app.dashboard",
      icon: "fa fa-home",
      order: 0,
    });
  }
})();
