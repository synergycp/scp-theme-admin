(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .component('pxeInstallTable', {
      require: {
        list: '\^list',
      },
      bindings: {},
      controller: 'PxeInstallTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/install/list/install.table.html'
    })
    .controller('PxeInstallTableCtrl', PxeInstallTableCtrl)
    ;

  /**
   * @ngInject
   */
  function PxeInstallTableCtrl() {
    var table = this;
    table.$onInit = init;

    ///////////

    function init() {
    }
  }
})();
