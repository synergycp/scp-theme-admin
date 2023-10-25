(function () {
  "use strict";

  angular.module("app.system", [
    "scp.core.api",
    "scp.angle.layout.list",

    "app.system.dashboard",
    "app.system.email",
    "app.system.license",
    "app.system.integration",
    "app.system.ssh.key",
    "app.system.setting",
    "app.system.template.suggested-change",
    "app.system.theme",
    "app.system.log",
    "app.system.health",
    "app.system.package",
    "app.system.version",
    "app.system.permission-groups",
   // "app.system.notification"
  ]);
})();
