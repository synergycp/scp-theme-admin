(function () {
  'use strict';

  angular
    .module('app.network.pool.list')
    .component('poolTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showAddr: '=?',
        showGroup: '=?',
        showServerCount: '=?',
        showVlan: '=?',
        showBillingId: '=?',
        showActions: '=?',
      },
      controller: 'PoolTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/pool/list/list.table.html'
    })
    .controller('PoolTableCtrl', PoolTableCtrl)
    ;

  /**
   * @ngInject
   */
  function PoolTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showAddr: true,
        showGroup: true,
        showServerCount: true,
        showVlan: true,
        showBillingId: true,
        showActions: true,
      });
    }
  }
})();
