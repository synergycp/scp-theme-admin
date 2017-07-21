(function () {
  'use strict';

  angular
    .module('app.system', [
      'scp.core.api',
      'scp.angle.layout.list',

      'app.system.email',
      'app.system.license',
      'app.system.integration',
      'app.system.setting',
      'app.system.log',
    ]);
})();
