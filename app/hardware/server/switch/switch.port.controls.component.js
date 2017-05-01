(function () {
  'use strict';

  var INTERVAL_CHECK_STATUS = 5 * 1000;

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
  function ServerSwitchPortControlCtrl(Loader, Modal, Api) {
    var portControl = this;
    var $command;

    portControl.loader = Loader();
    portControl.response = {
      show: false,
      commands: [],
      loader: Loader(),
      areCommandsFinished: false,
      areCommandsFinishedObj: {}
    };

    portControl.$onInit = init;
    portControl.syncVlan = command.bind(null, 'sync-vlan');
    portControl.syncSpeed = command.bind(null, 'sync-speed');
    portControl.power = {
      on: command.bind(null, 'power-on'),
      off: confirmPowerOff,
    };

    //////////

    function init() {
      $command = portControl.port
        .all('command')
        ;
    }

    function confirmPowerOff() {
      return portControl.loader.during(
        Modal
          .confirm([portControl.server], 'server.switch.power.off.confirm')
          .data({
            port: portControl.server.switch.port.name,
            switch: portControl.server.switch.name,
          })
          .open()
          .result
          .then(command.bind(null, 'power-off'))
      );
    }

    function command(cmd) {
      if(portControl.response.areCommandsFinished) clearCommandsOutput();
      return portControl.loader.during(
        $command
          .post({
            'command': cmd,
          })
          .then(listenForResponse)
          .then(fireChangeEvent)
      );
    }

    function listenForResponse(response) {
      portControl.response.show = true;
      portControl.response.loader.loading();

      var interval = setInterval(checkCommandStatus, INTERVAL_CHECK_STATUS);
      var $cmd = Api.one(
        'switch/'+response.command.switch.id+'/command/'+response.command.id
      );

      portControl.response.areCommandsFinishedObj[response.command.id] = false;

      return response;

      function updateCommandStatus(response) {
        if (response.status != 'Queued' && response.status != 'Running') {
          portControl.response.commands.push({
            id: response.id,
            output: response.output,
            errors: response.errors,
          });
          finish();
        }
      }

      function finish() {
        clearInterval(interval);
        portControl.response.areCommandsFinishedObj[response.command.id] = true;
        commandFinished();
      }

      function checkCommandStatus() {
        $cmd
          .get()
          .then(updateCommandStatus)
        ;
      }
    }

    function fireChangeEvent(response) {
      portControl.server.fire('change');

      return response;
    }

    function commandFinished() {
      var areAllFinished = false;
      _.forEach(portControl.response.areCommandsFinishedObj, function(value, key) {
        return areAllFinished = value; 
      });
      if(areAllFinished) {
        portControl.response.loader.loaded();
        portControl.response.areCommandsFinished = true;
        portControl.response.areCommandsFinishedObj = {};
      }
    }

    function clearCommandsOutput() {
      portControl.response.areCommandsFinished = false;
      portControl.response.commands = [];
    }
  }
})();
