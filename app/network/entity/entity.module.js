(function () {
  'use strict';

  angular
    .module('app.network.entity', [
      'scp.angle.layout.list',
      'scp.core.api',
      'app.network.entity.assign',
      'app.network.entity.search',
      'app.network.entity.filters',
    ]);
})();
