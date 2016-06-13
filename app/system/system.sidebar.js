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
    SidebarProvider.group('system', {
      translate: "sidebar.SYSTEM",
      sref: "app.system.setting",
      icon: "fa fa-wrench",
    }).item({
      text: "Settings",
      sref: "app.system.setting",
    }).item({
      text: "Emails",
      sref: "app.system.email",
    }).item({
      text: "Logs",
      sref: "app.system.log",
    });
  }
})();
