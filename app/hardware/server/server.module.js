(function () {
  'use strict';

  angular
    .module('app.hardware.server', [
      'app.layout.list',
      'app.core.api',
      'ui.select',
      'app.hardware.server.assign',
      'app.hardware.server.bandwidth',
      'app.hardware.server.manage',
    ]);
})();
