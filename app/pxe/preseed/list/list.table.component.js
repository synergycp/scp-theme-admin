(function () {
  'use strict';

  angular
    .module('app.pxe.preseed.list')
    .component('preseedTable', {
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
      controller: 'PreseedTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/preseed/list/list.table.html'
    })
    .controller('PreseedTableCtrl', PreseedTableCtrl)
    ;

  /**
   * @ngInject
   */
  function PreseedTableCtrl() {
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
