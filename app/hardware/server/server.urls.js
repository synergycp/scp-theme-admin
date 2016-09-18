(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .run(serverUrls)
    ;

  /**
   * @ngInject
   */
  function serverUrls(Url, $state) {
    Url.map('server/([0-9]+)', function (id) {
      return $state.href('app.hardware.server.view.manage', {
        id: id,
      });
    });
  }
})();
