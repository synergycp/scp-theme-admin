(function () {
  'use strict';

  angular
    .module('app.network.pool.assign')
    .service('PoolAssign', PoolAssignService);

  /**
   * PoolAssign Service
   *
   * @ngInject
   */
  function PoolAssignService (List, $uibModal) {
    var PoolAssign = this;
    var list = List('entity/pool');

    PoolAssign.group = group;

    //////////

    function group(items) {
      var modal = $uibModal.open({
        templateUrl: 'app/network/pool/assign/assign.group.modal.html',
        controller: 'PoolAssignGroupModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          items: function () {
            return items;
          },
        },
      });

      return modal.result.then(function (group) {
        return list.patch({
          group: group ? {id: group.id} : null,
        }, items);
      });
    }
  }
})();
