(function () {
  'use strict';

  angular
    .module('app.layout', [
      'app.layout.loadingbar',
      'app.layout.nav',
      'app.layout.alert',
      'app.layout.utils',
      'app.layout.logs',
      'app.search',
    ]);
})();
