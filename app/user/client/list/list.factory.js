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
      // [BA-404]
      list.bulk.add('Single sign-on only: turn on', list.patch.bind(null, {
        auth: { sso_only: true },
      }));
      list.bulk.add('Single sign-on only: turn off', list.patch.bind(null, {
        auth: { sso_only: false },
      }));
      list.bulk.add('Adding sub clients: stop', list.patch.bind(null, {
        sub_clients: { disabled: true },
      }));
      list.bulk.add('Adding sub clients: allow', list.patch.bind(null, {
        sub_clients: { disabled: false },
      }));
      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
