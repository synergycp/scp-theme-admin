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
    ServerAssignModal,
    ServerAssign,
    $stateParams
  ) {
    return function () {
      var list = List('server').filter({
        hub: $stateParams.switch,
        group: $stateParams.group,
        client: $stateParams.client,
      });

      list.bulk.add('Assign Client', assignClient);
      list.bulk.add('Suspend', confirmSuspend);
      list.bulk.add('Unsuspend', unsuspend);
      list.bulk.add('Delete', list.delete);

      return list;

      function confirmSuspend(servers) {
        return ServerAssignModal.suspend(servers)
          .branch()
            .then(list.refresh.now)
          .unbranch()
          ;
      }

      function unsuspend(servers) {
        return ServerAssign.unsuspend(servers)
          .branch()
            .then(list.refresh.now)
          .unbranch()
          ;
      }

      function assignClient(servers) {
        return ServerAssignModal.client(servers)
          .branch()
            .then(list.refresh.now)
          .unbranch()
          ;
      }
    };
  }
})();
