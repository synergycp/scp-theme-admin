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
    List,
    ListConfirm,
    ServerAssign,
    Modal,
    $stateParams,
    _
  ) {
    return function () {
      var list = List('server')
        .filter({
          group: $stateParams.group,
          switch: $stateParams.switch,
          client: $stateParams.client,
        });
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
      list.bulk.add('Run Switch Commands', switchCommands);
      list.bulk.add('Delete', confirm.delete);

      return list;

      function switchCommands(items) {
        return Modal
          .make({
            templateUrl: 'app/hardware/server/switch/switch.modal.bulk-commands.html',
            controller: 'ServerSwitchModalBulkCommandsCtrl',
            resolve: {
              items: _.wrap(items),
            },
          })
          .open()
          .result;
      }

      function handler(callback) {
        return function () {
          return callback.apply(null, arguments).then(fireChangeEvent);
        };
      }

      function fireChangeEvent(arg) {
        list.fire('change', arg);

        return arg;
      }
    };
  }
})();
