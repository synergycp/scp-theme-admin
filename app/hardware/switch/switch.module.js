(function () {
  'use strict';

  angular
    .module('app.hardware.switch', [
      'app.layout.list',
      'app.core.api',
      'ui.select',
      'app.hardware.switch.speed',
    ]);
})();
