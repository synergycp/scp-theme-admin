(function () {
  'use strict';

  angular
    .module('app.system')
    .config(SystemNavConfig)
    ;

  /**
   * @ngInject
   */
  function SystemNavConfig(NavProvider) {
    NavProvider.group('hardware', {
      translate: "nav.HARDWARE",
      sref: "#",
      icon: "fa fa-server",
    }).item({
      text: "Servers",
      sref: "app.hardware.server.list",
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
      sref: "app.hardware.switch.list",
    }).item({
      text: "Switch Port Speeds",
      sref: "app.hardware.switch.speed",
    });
  }
})();
