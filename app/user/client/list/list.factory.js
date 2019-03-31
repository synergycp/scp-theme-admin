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
  function ClientListFactory (List, ListConfirm, ClientModal) {
    return function () {
      var list = List('client');

      list.confirm = ListConfirm(list, 'client.modal.delete');
      list.bulk.add('Send Email', function (items) {
        return ClientModal.sendEmail(items).open();
      });
      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
