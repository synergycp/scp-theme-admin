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
  function ServerSwitchPortControlCtrl(Loader, Modal, Api, $q) {
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
    portControl.dryRun = false;

    portControl.$onInit = init;
    portControl.syncVlan = command.bind(null, 'sync-vlan');
    portControl.syncSpeed = command.bind(null, 'sync-speed');
    portControl.power = {
      on: command.bind(null, 'power-on'),
      off: confirmPowerOff,
    };
    portControl.wipe = confirmWipe;

    //////////

    function init() {
      $command = portControl.port
        .all('command')
      ;
    }

    function confirmPowerOff() {
      return modalConfirmCommand('power-off', 'server.switch.power.off.confirm');
    }

    function confirmWipe() {
      return modalConfirmCommand('wipe', 'server.switch.wipe.confirm');
    }

    function modalConfirmCommand(cmd, lang) {
      var getConfirmationIfNeeded = portControl.dryRun ? $q.when() : Modal
        .confirm([portControl.server], lang)
        .data({
          port: portControl.server.switch.port.name,
          switch: portControl.server.switch.name,
        })
        .open()
        .result;
      return portControl.loader.during(
        getConfirmationIfNeeded
          .then(command.bind(null, cmd))
      )
    }

    function command(cmd) {
      if (portControl.response.areCommandsFinished) {
        clearCommandsOutput();
      }
      return portControl.loader.during(
        $command
          .post({
            command: cmd,
            dry: portControl.dryRun,
          })
          .then(listenForResponse)
          .then(fireChangeEvent)
      );
    }

    function listenForResponse(response) {
      portControl.response.show = true;

      _.map(response.commands, listenForCommandComplete);
    }

    function listenForCommandComplete(command, index) {
      if (!command.id) {
        portControl.response.commands.push({
          id: index,
          output: command.command,
          errors: '',
        });
        commandFinished();
        return;
      }

      portControl.response.loader.loading();
      var interval = setInterval(checkCommandStatus, INTERVAL_CHECK_STATUS);

      portControl.response.areCommandsFinishedObj[command.id] = false;

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
        portControl.response.areCommandsFinishedObj[command.id] = true;
        commandFinished();
      }

      function checkCommandStatus() {
        Api.one('switch/' + command.switch.id + '/command/' + command.id)
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
      var areAllFinished = true;
      _.forEach(portControl.response.areCommandsFinishedObj, function (value, key) {
        areAllFinished &= value;
      });
      if (areAllFinished) {
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
