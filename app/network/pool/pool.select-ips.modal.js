(function () {
  'use strict';

  angular
    .module('app.network.pool')
    .service('PoolSelectIPsModal', PoolSelectIPsModalService);

  /**
   * SwitchModal Service
   *
   * @ngInject
   */
  function PoolSelectIPsModalService(Api, Modal, Select, RouteHelpers) {
    var PoolSelectIPsModal = this;

    PoolSelectIPsModal.open = open;

    //////////

    function open(group, client) {
      RouteHelpers.loadLang('pool');

      var availableIPs;
      var pool = Select('ip/pool')
        .filter({
          available: true,
          ip_group: group.id,
          client: client && client.id,
        })
        .on('change', resyncAvailableIPs);
      pool.load();
      function getAvailableIPs() {
        return availableIPs;
      }

      function resyncAvailableIPs() {
        availableIPs = Select('ip/pool/'+pool.selected.id+'/available-ip');
        availableIPs.load();
      }
      return Modal.confirm([], "pool.modal.select-ips")
        .data({pool: pool, availableIPs: getAvailableIPs, submitClass: 'btn-success'})
        .templateUrl("app/network/pool/pool.select-ips.modal.html")
        .open()
        .result
        .then(function () {
          return availableIPs.selected;
        })
    }
  }
})();
