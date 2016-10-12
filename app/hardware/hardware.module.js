(function () {
  'use strict';

  angular
    .module('app.hardware', [
      'app.hardware.server',
      'app.network.switch',
      'app.hardware.part',
    ]);
})();
