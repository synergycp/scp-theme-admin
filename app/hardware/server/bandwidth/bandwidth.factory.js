(function () {
  'use strict';

  angular
    .module('app.hardware.server.bandwidth')
    .factory('ServerBandwidth', ServerBandwidthFactory)
    ;

  /**
   * ServerBandwidth Factory
   *
   * @ngInject
   */
  function ServerBandwidthFactory (
    _,
    BandwidthState,
    ServerBandwidthBilling,
    ServerBandwidthPort
  ) {
    return function (server, filter) {
        return new ServerBandwidth(
          server,
          filter,
          BandwidthState(),
          ServerBandwidthBilling(),
          ServerBandwidthPort,
          _
        );
    };
  }

  function ServerBandwidth (server, filter, state, billing, Port, _) {
    // Private variables
    var serverBandwidth = this;

    // Public variables
    serverBandwidth.state = state;
    serverBandwidth.filter = filter;
    serverBandwidth.billing = billing;
    serverBandwidth.ports = [];

    // Public methods
    serverBandwidth.refresh = refresh;

    activate();

    // Private methods
    function activate() {
    }

    function refresh() {
      return serverBandwidth.state.loader.during(
        server
          .all('port')
          .getList()
          .then(storePorts)
      );
    }

    function storePorts(ports) {
      return _.each(ports, function (port) {
        var existingPort = _.find(serverBandwidth.ports, { id: port.id });
        if (existingPort) {
          return _.assign(existingPort, port);
        }

        serverBandwidth.ports.push(
          Port(server, port, filter)
        );
      });
    }
  }
})();
