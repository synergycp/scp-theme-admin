(function () {
  'use strict';

  angular
    .module('app.hardware.server', [
      'scp.core.api',
      'ui.select',
      'app.hardware.server.assign',
      'app.hardware.server.bandwidth',
      'app.hardware.server.list',
      'app.hardware.server.provision',
      'app.hardware.server.search',
      'app.hardware.server.view',
    ]);
})();
