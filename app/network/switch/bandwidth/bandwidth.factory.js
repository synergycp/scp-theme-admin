(function () {
  'use strict';

  angular
    .module('app.network.switch.bandwidth')
    .factory('SwitchBandwidth', SwitchBandwidthFactory);

  /**
   * SwitchBandwidth Factory
   *
   * @ngInject
   */
  function SwitchBandwidthFactory (
    _,
    BandwidthState,
    SwitchBandwidthPort
  ) {
    return function (target, filter) {
        return new SwitchBandwidth(
          target,
          filter,
          BandwidthState(),
          SwitchBandwidthPort,
          _
        );
    };
  }

  function SwitchBandwidth (target, filter, state, Port, _) {
    // Private variables
    var switchBandwidth = this;

    // Public variables
    switchBandwidth.state = state;
    switchBandwidth.filter = filter;
    switchBandwidth.ports = [];
    switchBandwidth.add = addPort;

    // Public methods
    switchBandwidth.refresh = refresh;

    activate();

    // Private methods
    function activate() {
    }

    function addPort(port) {
      var existingPort = _.find(
        switchBandwidth.ports,
        {
          port: {
            id: port.id,
          }
        }
      );

      if (existingPort) {
        return _.assign(existingPort, port);
      }

      var tab = Port(target, port, filter);

      switchBandwidth.ports.push(tab);

      return tab;
    }

    function refresh() {
      return switchBandwidth.state.loader.during(
        target
          .all('port')
          .getList({
            is_switch_primary: true,
          })
          .then(storePorts)
      );
    }

    function storePorts(ports) {
      return _.map(ports, addPort);
    }
  }
})();
