(function () {
  'use strict';

  angular
    .module('app.hardware.part')
    .factory('PartList', PartListFactory);

  /**
   * PartList Factory
   *
   * @ngInject
   */
  function PartListFactory (List, $uibModal) {
    return function () {
      var list = List('part');

      var doDelete = list.delete;
      list.delete = remove;
      list.add = add;

      function add() {
        list.items.push({});
      }

      function remove(items) {
        var idItems = _.filter(items, 'id');
        if (idItems.length) {
          return doDelete(idItems)
            .catch(handleError);
        }

        _(items).reject('id').map(_.remove.bind(_, list.items)).value();

        function handleError(response) {
          if (response.data.data.missing_part_id) {
            return showMergeModal(idItems);
          }

          throw response;
        }
      }

      function showMergeModal(items) {
        var modal = $uibModal.open({
          templateUrl: 'app/hardware/part/modal/modal.merge.html',
          controller: 'PartModalMergeCtrl',
          bindToController: true,
          controllerAs: 'modal',
          resolve: {
            items: function () {
              return items;
            },
          },
        });

        return modal.result.then(function (item) {
          return doDelete(items, {
            replace_part_id: item.id,
          });
        });
      }

      return list;
    };
  }
})();
