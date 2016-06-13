(function () {
  'use strict';

  angular
    .module('app.system')
    .config(SystemSidebarConfig)
    ;

  /**
   * @ngInject
   */
  function SystemSidebarConfig(SidebarProvider) {
    SidebarProvider.group('network', {
      translate: "sidebar.network.TITLE",
      sref: "#",
      icon: "fa fa-sitemap",
    }).item({
      translate: "sidebar.network.ENTITIES",
      sref: "app.network.entity",
    }).item({
      translate: "sidebar.network.GROUPS",
      sref: "app.network.group",
    });
  }
})();
