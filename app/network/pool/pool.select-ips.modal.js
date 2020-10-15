(function () {
  "use strict";

  angular
    .module("app.network.pool")
    .service("PoolSelectIPsModal", PoolSelectIPsModalService);

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
      RouteHelpers.loadLang("pool");

      var availableIPs;
      var pool = Select("ip/pool")
        .filter({
          available: true,
          ip_group: group.id,
          "owner_could_be[type]": client && "client",
          "owner_could_be[id]": client && client.id,
          "sort[]": "-owner",
        })
        .on("change", resyncAvailableIPs);
      pool.load();
      function getAvailableIPs() {
        return availableIPs;
      }

      function resyncAvailableIPs() {
        availableIPs = Select("ip/pool/" + pool.selected.id + "/available-ip");
        availableIPs.load();
      }
      return Modal.confirm([], "pool.modal.select-ips")
        .data({
          pool: pool,
          availableIPs: getAvailableIPs,
          submitClass: "btn-success",
        })
        .templateUrl("app/network/pool/pool.select-ips.modal.html")
        .open()
        .result.then(function () {
          return _.map(availableIPs.selected, function (ip) {
            return new PoolIP(pool.selected, ip);
          });
        });
    }
  }

  function PoolIP(pool, ip) {
    this.pool = pool;
    this.ip = ip;
    this.name = ip;
    this.group = pool.group;
    this.id = ip;

    this.setOwner = function setOwner(port) {
      return this.pool.post("ip", {
        range_start: this.ip,
        range_end: this.ip,
        owner: {
          type: "server.port",
          id: port.id,
        },
      });
    }.bind(this);

    this.removeOwner = function removeOwner() {
      // these PoolIPs are fresh ones so technically haven't been added yet.
    }.bind(this);

    this.extraForFilter = function extraForFilter() {
      return {
        type: "ip.pool",
        id: this.pool.id,
      };
    }.bind(this);
  }
})();
