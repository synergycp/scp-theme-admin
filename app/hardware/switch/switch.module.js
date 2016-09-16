(function () {
  'use strict';

  angular
    .module('app.hardware.switch', [
      'scp.angle.layout.list',
      'scp.core.api',
      'ui.select',
      'app.hardware.switch.speed',
      'app.hardware.switch.manage',
      'app.hardware.switch.search',
      'app.hardware.switch.dashboard',
    ]);
})();
