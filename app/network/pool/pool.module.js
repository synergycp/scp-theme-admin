(function () {
  'use strict';

  angular
    .module('app.network.pool', [
      'scp.angle.layout.list',
      'scp.core.api',
      'app.network.pool.assign',
      'app.network.pool.list',
      'app.network.pool.search',
    ]);
})();
