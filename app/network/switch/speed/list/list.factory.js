(function () {
  'use strict';

  angular
    .module('app.network.switch.speed.list')
    .factory('SwitchSpeedList', SwitchSpeedListFactory);

  /**
   * SwitchSpeedList Factory
   *
   * @ngInject
   */
  function SwitchSpeedListFactory ($uibModal, List, ListConfirm) {
    return function () {
      var list = List('port-speed');
      list.confirm = ListConfirm(list, 'speed.modal.delete');

      var doDelete = list.delete;
      list.delete = proxyDelete;
      list.bulk.add('Delete', list.confirm.delete);

      return list;

      function proxyDelete(items) {
        return doDelete(items)
          .catch(function (response) {
            if (response.data.data.missing_merge_id) {
              return showMergeModal(items);
            }

            throw response;
          });
      }

      function showMergeModal(items) {
        var modal = $uibModal.open({
          templateUrl: 'app/network/switch/speed/modal/modal.merge.html',
          controller: 'SpeedModalMergeCtrl',
          bindToController: true,
          controllerAs: 'modal',
          resolve: {
            items: function () {
              return items;
            }
          }
        });

        return modal.result.then(function (speed) {
          return doDelete(items, {
            merge_id: speed.id,
          });
        });
      }
    };
  }
})();
