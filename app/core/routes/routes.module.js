(function () {
  'use strict';

  angular
    .module('app.core.routes', [
      'app.core.lazyload',
      'app.core.api',
      'ct.ui.router.extras',
    ]);
})();
