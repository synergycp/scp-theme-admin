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
  function ServerSwitchControlCtrl(Loader, $scope, $state) {
    var switchControl = this;

    $scope.$state = $state;

    switchControl.loader = Loader();

    switchControl.$onInit = init;
    switchControl.ports = [];
    switchControl.tabs = {
      active: 0,
      change: changeTab,
    };

    switchControl.refreshPorts = refreshPorts;

    //////////

    function init() {
      switchControl.refreshPorts();
    }

    function changeTab(tab) {
    }

    function refreshPorts() {
      switchControl.server
        .all('port')
        .getList()
        .then(storePorts)
        ;
    }

    function storePorts(response) {
      _.setContents(switchControl.ports, response);
    }
  }
})();
