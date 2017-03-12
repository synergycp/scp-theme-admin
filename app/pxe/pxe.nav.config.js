(function () {
  'use strict';

  angular
    .module('app.network')
    .run(NavConfig)
  ;

  var PRESEEDS = {
    text: "Preseeds",
    sref: "app.pxe.preseed.list",
  };

  var PROFILES = {
    text: "Profiles",
    sref: "app.pxe.profile.list",
  };

  var SHELL_SCRIPTS = {
    text: "Shell Scripts",
    sref: "app.pxe.shell.list",
  };

  var BOOT_SCRIPTS = {
    text: "Boot Scripts",
    sref: "app.pxe.boot.list",
  };

  var ISOS = {
    text: "ISO Manager",
    sref: "app.pxe.iso.list",
  };

  var DRIVERS = {
    text: "PXE Drivers",
    sref: "app.pxe.driver.list",
  }

  var DEPLOY_SERVERS = {
    text: "Deploy Servers",
    sref: "app.pxe.server.list",
  }

  /**
   * @ngInject
   */
  function NavConfig(Auth, Nav, Permission, PxeInstallNav) {
    var group = Nav.group('pxe', {
      translate: "nav.pxe.TITLE",
      sref: "app.pxe.install.list",
      icon: "fa fa-upload",
    });

    Auth.whileLoggedIn(show, hide);

    function show() {
      Permission
        .map()
        .then(showPermitted)
      ;
    }

    function showPermitted(map) {
      if (map.pxe.installs.read) {
        group.item(PxeInstallNav);
      }

      if (map.pxe.settings.read) {
        group.item(PRESEEDS);
        group.item(PROFILES);
        group.item(SHELL_SCRIPTS);
        group.item(BOOT_SCRIPTS);
        group.item(ISOS);
        group.item(DRIVERS);
        group.item(DEPLOY_SERVERS);
      }
    }

    function hide() {
      group.remove(PxeInstallNav);
      group.remove(PRESEEDS);
      group.remove(PROFILES);
      group.remove(SHELL_SCRIPTS);
      group.remove(BOOT_SCRIPTS);
      group.remove(ISOS);
      group.remove(DRIVERS);
      group.remove(DEPLOY_SERVERS);
    }
  }
})();
