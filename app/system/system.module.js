(function () {
  'use strict';

  angular
    .module('app.system', [
      'scp.angle.layout.list',
      'scp.core.api',
      'app.system.setting',
      'app.system.email',
    ]);
})();
