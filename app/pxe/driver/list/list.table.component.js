(function () {
  'use strict';

  angular
    .module('app.pxe.driver.list')
    .component('pxeDriverTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showActions: '=?',
      },
      controller: 'PxeDriverTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/driver/list/list.table.html'
    })
    .controller('PxeDriverTableCtrl', PxeDriverTableCtrl)
    ;

  /**
   * @ngInject
   */
  function PxeDriverTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showActions: true,
      });
    }
  }
})();
