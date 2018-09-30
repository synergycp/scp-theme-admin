(function () {
  'use strict';

  angular
    .module('app.pxe.iso.list')
    .component('isoTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showReserved: '=?',
        showIpEntities: '=?',
        showServers: '=?',
        showActions: '=?',
      },
      controller: 'IsoTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/iso/list/list.table.html'
    })
    .controller('IsoTableCtrl', IsoTableCtrl)
    ;

  /**
   * @ngInject
   */
  function IsoTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showReserved: true,
        showIpEntities: true,
        showServers: true,
        showActions: true,
      });
    }
  }
})();
