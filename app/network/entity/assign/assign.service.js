(function () {
  'use strict';

  angular
    .module('app.network.entity.assign')
    .service('EntityAssign', EntityAssignService);

  /**
   * EntityAssign Service
   *
   * @ngInject
   */
  function EntityAssignService (List, $uibModal) {
    var EntityAssign = this;
    var list = List('entity');

    EntityAssign.group = group;

    //////////

    function group(items) {
      var modal = $uibModal.open({
        templateUrl: 'app/network/entity/assign/assign.group.modal.html',
        controller: 'EntityAssignGroupModalCtrl',
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
          group: group ? group.id : null,
        }, items);
      });
    }
  }
})();
