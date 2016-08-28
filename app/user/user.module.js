(function () {
  'use strict';

  angular
    .module('app.user', [
      'app.layout.list',
      'app.core.api',
      'app.user.client',
      'app.user.admin',
      'app.user.account',
    ]);
})();
