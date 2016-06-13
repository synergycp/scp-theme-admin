(function () {
  'use strict';

  angular
    .module('app.layout.sidebar')
    .config(SidebarOrderConfig)
    ;

  /**
   * @ngInject
   */
  function SidebarOrderConfig(SidebarProvider) {
    SidebarProvider.order([
      'header',
      'dashboard',
      'user',
      'network',
      'hardware',
      'system',
    ]);
    SidebarProvider.group('header', {
      heading: "true",
      translate: "app.sidebar.heading.HEADER"
    });
  }
})();
