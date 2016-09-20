(function () {
  'use strict';

  angular
    .module('app.pxe.boot.list')
    .component('bootScriptTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        // showName: '=?',
      },
      controller: 'BootScriptTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/boot/list/list.table.html'
    })
    .controller('BootScriptTableCtrl', BootScriptTableCtrl)
    ;

  /**
   * @ngInject
   */
  function BootScriptTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        // showName: true,
      });
    }
  }
})();
