(function () {
  'use strict';

  angular
    .module('app.hardware.server', [
      'scp.angle.layout.list',
      'scp.core.api',
      'ui.select',
      'app.hardware.server.assign',
      'app.hardware.server.bandwidth',
      'app.hardware.server.manage',
      'app.hardware.server.search',
    ]);
})();
