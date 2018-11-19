(function () {
  'use strict';

  angular
    .module('app.network.entity.list')
    .component('entityTable', {
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
      controller: 'EntityTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/entity/list/list.table.html'
    })
    .controller('EntityTableCtrl', EntityTableCtrl)
    ;

  /**
   * @ngInject
   */
  function EntityTableCtrl() {
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
