(function () {
  'use strict';

  angular
    .module('app', [
      'app.core',
      'app.dashboard',
      'app.user',
      'app.pxe',
      'app.network',
      'app.hardware',
      'app.permission',
      'app.system',
    ]);
})();
