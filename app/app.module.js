(function () {
  'use strict';

  angular
    .module('app', [
      'app.core',
      'app.auth',
      'app.dashboard',
      'app.layout',
      'app.user',
      'app.pxe',
    ]);
})();
