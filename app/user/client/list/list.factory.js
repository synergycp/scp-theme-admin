(function () {
  'use strict';

  angular
    .module('app.user.client.list')
    .factory('ClientList', ClientListFactory)
    ;

  /**
   * ClientList Factory
   *
   * @ngInject
   */
  function ClientListFactory (List, ListConfirm) {
    return function () {
      var list = List('client')
        .setSortPaginationUrlParams(true);

      list.confirm = ListConfirm(list, 'client.modal.delete');
      list.bulk.add('Delete', list.confirm.delete);

      list.destroy = destroy;

      return list;

      function destroy() {
        list.clearSortPaginationUrlParams();
      }
    };
  }
})();
