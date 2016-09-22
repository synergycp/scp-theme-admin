(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverSwitchControl', {
      require: {},
      bindings: {
        server: '=',
      },
      controller: 'ServerSwitchControlCtrl as switchControl',
      transclude: true,
      templateUrl: 'app/hardware/server/switch/switch.html'
    })
    .controller('ServerSwitchControlCtrl', ServerSwitchControlCtrl);

  /**
   * @ngInject
   */
  function ServerSwitchControlCtrl(Api, Loader, Modal, $scope, $state) {
    var switchControl = this;

    $scope.$state = $state;

    switchControl.loader = Loader();
    switchControl.isEnabled = false;
    switchControl.response = "";

    switchControl.patch = patch;
    switchControl.$onInit = init;

    switchControl.power = {
      on: patch.bind(null, {
        power: 'on',
      }),
      off: confirmPowerOff,
    };

    //////////

    function init() {
      switchControl.isEnabled = switchControl.server.is_switch_ready;
    }

    function confirmPowerOff() {
      var patchData = {
        power: 'off',
      };

      return switchControl.loader.during(
        Modal
          .confirm([switchControl.server], 'server.switch.power.off.confirm')
          .data({
            port: switchControl.server.switch.port,
            switch: switchControl.server.switch.name,
          })
          .open()
          .result
          .then(patch.bind(null, patchData))
      );
    }

    function patch(data) {
      return switchControl.loader.during(
        switchControl.server
          .one('switch/'+switchControl.server.switch.id)
          .patch(data)
          .then(showResponse)
          .then(fireChangeEvent)
      );
    }

    function showResponse(response) {
      switchControl.response = response.output;

      return response;
    }

    function fireChangeEvent(response) {
      switchControl.server.fire('change');

      return response;
    }
  }
})();
