(function () {
  'use strict';

  angular
    .module('app.system.log.list')
    .component('logTable', {
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
      controller: 'LogTableCtrl as table',
      transclude: true,
      templateUrl: 'app/system/log/list/list.table.html'
    })
    .controller('LogTableCtrl', LogTableCtrl)
    ;

  /**
   * @ngInject
   */
  function LogTableCtrl() {
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
