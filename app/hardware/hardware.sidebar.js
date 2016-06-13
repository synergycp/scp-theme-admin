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
    SidebarProvider.group('hardware', {
      translate: "sidebar.HARDWARE",
      sref: "#",
      icon: "fa fa-server",
    }).item({
      text: "Servers",
      sref: "app.hardware.server",
    }).item({
      text: "Server Inventory",
      sref: "app.hardware.server.inventory",
    }).item({
      text: "Provision",
      sref: "app.hardware.server.provision",
    }).item({
      text: "Part Inventory",
      sref: "app.hardware.part",
    }).item({
      text: "Switches",
      sref: "app.hardware.switch",
    });
  }
})();
