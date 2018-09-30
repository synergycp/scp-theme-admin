(function () {
  'use strict';

  angular
    .module('app.hardware')
    .run(NavConfig)
  ;

  var PARTS = {
    text: "Part Inventory",
    sref: "app.hardware.part.list",
  };

  var PROVISION = {
    text: "Provision",
    sref: "app.hardware.server.provision",
  };

  /**
   * @ngInject
   */
  function NavConfig(Auth, Nav, Permission, ServerInventoryNav, ServerListNav) {
    var group = Nav.group('hardware', {
      translate: "nav.HARDWARE",
      sref: "app.hardware.server.list",
      icon: "fa fa-server",
    });

    Auth.whileLoggedIn(show, hide);

    function show() {
      Permission
        .map()
        .then(showPermitted)
      ;
    }

    function showPermitted(map) {
      if (map.server.in_use.read || map.server.in_inventory.read) {
        group.item(ServerListNav);
      }

      if (map.server.in_inventory.read) {
        group.item(ServerInventoryNav);
      }

      if (map.server.in_inventory.write) {
        group.item(PROVISION);
      }

      if (map.server.settings.read) {
        group.item(PARTS);
      }
    }

    function hide() {
      group.remove(PROVISION);
      group.remove(PARTS);
      group.remove(ServerListNav);
      group.remove(ServerInventoryNav);
    }
  }
})();
