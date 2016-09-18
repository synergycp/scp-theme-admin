(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .run(entityUrls)
    ;

  /**
   * @ngInject
   */
  function entityUrls(Url, $state) {
    Url.map('entity/([0-9]+)', function (id) {
      return $state.href('app.network.entity.view', {
        id: id,
      });
    });
  }
})();
