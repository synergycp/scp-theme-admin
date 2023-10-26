(function () {
  "use strict";

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

  var PACKAGES = {
    text: "Package Manager",
    sref: "app.system.package.list",
  };

  var PERMISSION_GROUPS = {
    text: "Permission Groups",
    sref: "app.system.permission-groups.list",
  };
  var NOTIFICATION = {
    text: "Notification",
    sref: "app.system.notification.list",
  };
  angular.module("app.system").run(SystemNavConfig);

  /**
   * @ngInject
   */
  function SystemNavConfig(Auth, Nav, Permission) {
    var group = Nav.group("system", {
      translate: "nav.SYSTEM",
      icon: "fa fa-wrench",
    });

    Auth.whileLoggedIn(show, hide);

    function show() {
      Permission.map().then(showPermitted);
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

      if (map.system.package.read) {
        group.item(PACKAGES);
      }

      if (map.users.admins.write) {
        group.item(PERMISSION_GROUPS);
      }

      if (map.system.settings.read) {
        group.item(SSH_KEYS);
      }
      if (map.notification.read) {
        group.item(NOTIFICATION);
      }
    }

    function hide() {
      group.remove(LOGS);
      group.remove(SETTINGS);
      group.remove(THEME);
      group.remove(INTEGRATIONS);
      group.remove(EMAILS);
      group.remove(SSH_KEYS);
      group.remove(PACKAGES);
      group.remove(PERMISSION_GROUPS);
      group.remove(NOTIFICATION);
    }
  }
})();
