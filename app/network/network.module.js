(function () {
  'use strict';

  angular
    .module('app.network', [
      'app.network.entity',
      'app.network.pool',
      'app.network.group',
      'app.network.forward.gateway',
    ]);
})();
