(function () {
  'use strict';

  angular
    .module('app.pxe.dhcp.list')
    .component('pxeDhcpTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showActions: '=?',
      },
      controller: 'ServerTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/dhcp/list/list.table.html'
    })
    .controller('ServerTableCtrl', ServerTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerTableCtrl() {
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
