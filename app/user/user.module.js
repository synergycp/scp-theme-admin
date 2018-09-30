(function () {
  'use strict';

  angular
    .module('app.user', [
      'scp.angle.layout.list',
      'scp.core.api',
      'app.user.client',
      'app.user.admin',
      'app.user.admin.buttons',
      'app.user.key',
    ]);
})();
