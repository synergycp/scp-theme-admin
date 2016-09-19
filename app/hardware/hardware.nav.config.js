(function () {
  'use strict';

  angular
    .module('app.system')
    .config(SystemNavConfig)
    ;

  /**
   * @ngInject
   */
  function SystemNavConfig(NavProvider, ServerInventoryNav, ServerListNav) {
    NavProvider
      .group('hardware', {
        translate: "nav.HARDWARE",
        sref: "#",
        icon: "fa fa-server",
      })
      .item(ServerListNav)
      .item(ServerInventoryNav)
      .item({
        text: "Provision",
        sref: "app.hardware.server.provision",
      })
      .item({
        text: "Part Inventory",
        sref: "app.hardware.part.list",
      })
      .item({
        text: "Switches",
        sref: "app.hardware.switch.list",
      })
      .item({
        text: "Switch Port Speeds",
        sref: "app.hardware.switch.speed.list",
      });
  }
})();
