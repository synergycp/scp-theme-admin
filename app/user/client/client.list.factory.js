(function () {
  'use strict';

  angular
    .module('app.user.client')
    .factory('ClientList', ClientListFactory);

  /**
   * ClientList Factory
   *
   * @ngInject
   */
  function ClientListFactory (List, ListConfirm) {
    return function () {
      var list = List('client');

      list.confirm = ListConfirm(list, 'client.modal.delete');
      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
