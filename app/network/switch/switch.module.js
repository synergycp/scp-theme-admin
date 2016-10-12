(function () {
  'use strict';

  angular
    .module('app.network.switch', [
      'scp.angle.layout.list',
      'scp.core.api',
      'ui.select',
      'app.network.switch.speed',
      'app.network.switch.view.manage',
      'app.network.switch.search',
      'app.network.switch.dashboard',
      'app.network.switch.list',
      'app.network.switch.view',
      'app.network.switch.scan',
    ]);
})();
