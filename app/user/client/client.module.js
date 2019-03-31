(function () {
  'use strict';

  angular
    .module('app.user.client', [
      'ui.bootstrap.modal',
      'app.user.client.search',
      'app.user.client.list',
      'app.user.client.view',
      'scp.angle.user.client.modal',
    ]);
})();
