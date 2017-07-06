(function () {
  'use strict';

  angular
    .module('app.hardware')
    .factory('ServerList', ServerListFactory);

  /**
   * ServerList Factory
   *
   * @ngInject
   */
  function ServerListFactory (
    _,
    List,
    ListConfirm,
    ServerAssign,
    $stateParams
  ) {
    return function () {
      var list = List('server')
        .filter({
          group: $stateParams.group,
          switch: $stateParams.switch,
          client: $stateParams.client,
        })
        .setPaginationAndSortToUrl(true);
      var confirm = ListConfirm(list, 'server.modal.delete');

      list.bulk.add('Assign Client', handler(ServerAssign.client));
      /*
      list.bulk.add(
        'Assign Bandwidth Limit',
        handler(ServerAssign.billing.limits)
      );
      */
      list.bulk.add(
        'Assign Billing Date',
        handler(ServerAssign.billing.date)
      );
      list.bulk.add('Suspend', handler(ServerAssign.suspend));
      list.bulk.add('Unsuspend', handler(ServerAssign.unsuspend));
      list.bulk.add('Delete', confirm.delete);

      list.destroy = destroy;

      return list;

      function handler(callback) {
        return function () {
          return callback.apply(null, arguments).then(fireChangeEvent);
        };
      }

      function fireChangeEvent(arg) {
        list.fire('change', arg);

        return arg;
      }

      function destroy() {
        list.clearPaginationAndSortFromUrl();
      }
    };
  }
})();
