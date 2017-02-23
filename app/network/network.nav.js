(function () {
  'use strict';

  angular
    .module('app.network')
    .config(NavConfig)
    .run(NavRun)
  ;

  var GROUPS = {
    translate: "nav.network.GROUPS",
    sref: "app.network.group.list",
  };

  var ENTITIES = {
    translate: "nav.network.ENTITIES",
    sref: "app.network.entity.list",
  };

  var SWITCHES = {
    text: "Switches",
    sref: "app.network.switch.list",
  };

  var SPEEDS = {
    text: "Switch Port Speeds",
    sref: "app.network.switch.speed.list",
  };

  /**
   * @ngInject
   */
  function NavConfig(NavProvider) {
    NavProvider.group('network', {
      translate: "nav.network.TITLE",
      icon: "fa fa-sitemap",
    });
  }

  /**
   * @ngInject
   */
  function NavRun(Auth, Nav, Permission) {
    var group = Nav.group('network');

    Auth.whileLoggedIn(checkPerms, hide);

    function checkPerms() {
      Permission
        .map()
        .then(showPermitted)
      ;
    }

    function showPermitted(map) {
      if (map.network.groups.read) {
        group.item(GROUPS);
      }

      if (map.network.entities.read) {
        group.item(ENTITIES);
      }

      if (map.network.switches.read) {
        group.item(SWITCHES);
        group.item(SPEEDS);
      }
    }

    function hide() {
      group.remove(GROUPS);
      group.remove(ENTITIES);
      group.remove(SWITCHES);
      group.remove(SPEEDS);
    }
  }
})();
