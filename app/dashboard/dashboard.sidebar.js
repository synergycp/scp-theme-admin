(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .config(SidebarConfig)
    ;

  /**
   * @ngInject
   */
  function SidebarConfig(SidebarProvider) {
    SidebarProvider.group('dashboard', {
      translate: "sidebar.DASH",
      sref: "app.dashboard",
      icon: "fa fa-home",
      alert: 1,
      order: 0,
    });
  }
})();
