(function () {
  'use strict';

  angular
    .module('app.pxe', [
      'app.layout.list',
      'app.core.api',
      'app.pxe.install',
    ]);
})();
