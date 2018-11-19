(function () {
  'use strict';

  var LOGS = {
    text: "Logs",
    sref: "app.system.log.list",
  };

  var SETTINGS = {
    text: "Settings",
    sref: "app.system.setting.list",
  };

  var THEME = {
    text: "Theme",
    sref: "app.system.theme.home",
  };

  var INTEGRATIONS = {
    text: "Integrations",
    sref: "app.system.integration.list",
  };

  var EMAILS = {
    text: "Emails",
    sref: "app.system.email.list",
  };

  var SSH_KEYS = {
    text: "SSH Keys",
    sref: "app.system.ssh.key.home",
  };

  angular
    .module('app.system')
    .run(SystemNavConfig)
  ;

  /**
   * @ngInject
   */
  function SystemNavConfig(Auth, Nav, Permission) {
    var group = Nav.group('system', {
      translate: "nav.SYSTEM",
      icon: "fa fa-wrench",
    });

    Auth.whileLoggedIn(show, hide);

    function show() {
      Permission
        .map()
        .then(showPermitted)
      ;
    }

    function showPermitted(map) {
      if (map.system.logs.read) {
        group.item(LOGS);
      }

      if (map.system.settings.read) {
        group.item(SETTINGS);
      }

      if (map.system.theme.read) {
        group.item(THEME);
      }

      if (map.system.integrations.read) {
        group.item(INTEGRATIONS);
      }

      if (map.system.emails.read) {
        group.item(EMAILS);
      }

      group.item(SSH_KEYS);
    }

    function hide() {
      group.remove(LOGS);
      group.remove(SETTINGS);
      group.remove(THEME);
      group.remove(INTEGRATIONS);
      group.remove(EMAILS);
      group.remove(SSH_KEYS);
    }
  }
})();
