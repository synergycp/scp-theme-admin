(function () {
  'use strict';

  angular
    .module('app.system', [
      'scp.core.api',
      'scp.angle.layout.list',

      'app.system.email',
      'app.system.integration',
      'app.system.setting',
      'app.system.log',
      'app.system.package',
    ]);
})();
