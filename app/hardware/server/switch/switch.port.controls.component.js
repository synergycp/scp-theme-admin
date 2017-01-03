(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverSwitchPortControl', {
      require: {},
      bindings: {
        server: '=',
        port: '=',
      },
      controller: 'ServerSwitchPortControlCtrl as portControl',
      transclude: true,
      templateUrl: 'app/hardware/server/switch/switch.port.controls.html'
    })
    .controller('ServerSwitchPortControlCtrl', ServerSwitchPortControlCtrl);

  /**
   * @ngInject
   */
  function ServerSwitchPortControlCtrl(Loader, Modal) {
    var portControl = this;

    portControl.loader = Loader();
    portControl.response = "";

    portControl.patch = patch;
    portControl.$onInit = init;

    portControl.power = {
      on: patch.bind(null, {
        power: 'on',
      }),
      off: confirmPowerOff,
    };

    //////////

    function init() {
    }

    function confirmPowerOff() {
      var patchData = {
        power: 'off',
      };

      return portControl.loader.during(
        Modal
          .confirm([portControl.server], 'server.switch.power.off.confirm')
          .data({
            port: portControl.server.switch.port,
            switch: portControl.server.switch.name,
          })
          .open()
          .result
          .then(patch.bind(null, patchData))
      );
    }

    function patch(data) {
      return portControl.loader.during(
        portControl.port
          .patch(data)
          .then(showResponse)
          .then(fireChangeEvent)
      );
    }

    function showResponse(response) {
      portControl.response = response.output;

      return response;
    }

    function fireChangeEvent(response) {
      portControl.server.fire('change');

      return response;
    }
  }
})();
