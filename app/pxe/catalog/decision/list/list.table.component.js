(function () {
  'use strict';

  angular
    .module('app.pxe.catalog.decision.list')
    .component('catalogDecisionTable', {
      require: {
        list: '^list',
      },
      controller: 'CatalogDecisionTableCtrl as table',
      templateUrl: 'app/pxe/catalog/decision/list/list.table.html',
    })
    .controller('CatalogDecisionTableCtrl', CatalogDecisionTableCtrl);

  /**
   * @ngInject
   */
  function CatalogDecisionTableCtrl($uibModal) {
    var table = this;

    table.restore = restore;

    ///////////

    function restore(item) {
      $uibModal.open({
        template:
          '<div class="modal-header"><h3 class="modal-title">Restore Template Decision</h3></div>' +
          '<div class="modal-body">' +
          '<p>Restore the discarded suggestion for <strong>{{ vm.slug }}</strong> ({{ vm.piece }})? The catalog will re-sync and the suggested change will reappear.</p>' +
          '<table class="table table-condensed m-t-sm">' +
          '<tr><th>Discarded by</th><td>{{ vm.decidedByUserId || \'-\' }}</td></tr>' +
          '<tr><th>Reason</th><td>{{ vm.reason || \'-\' }}</td></tr>' +
          '</table>' +
          '</div>' +
          '<div class="modal-footer">' +
          '<button class="btn btn-danger" ng-click="vm.confirm()">Restore</button>' +
          '<button class="btn btn-default" ng-click="vm.cancel()">Cancel</button>' +
          '</div>',
        controller: function ($uibModalInstance) {
          var m = this;
          m.slug = item.slug;
          m.piece = item.piece;
          m.decidedByUserId = item.decided_by_user_id;
          m.reason = item.reason;
          m.confirm = function () { $uibModalInstance.close(); };
          m.cancel = function () { $uibModalInstance.dismiss(); };
        },
        controllerAs: 'vm',
        bindToController: true,
      }).result.then(function () {
        table.list.list.restore(item);
      });
    }
  }
})();
