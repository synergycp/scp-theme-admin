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
      var confirm = ListConfirm(list, 'user.client.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();