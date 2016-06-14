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
    SidebarProvider.group('user', {
      translate: "sidebar.USERS",
      sref: "#",
      icon: "fa fa-user",
    }).item({
      text: "Clients",
      sref: "app.users.clients",
    }).item({
      text: "Administrators",
      sref: "app.users.admins",
    });
  }
})();
