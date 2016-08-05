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
  function ServerSwitchControlCtrl(Api, Loader, $scope, $state) {
    var switchControl = this;

    $scope.$state = $state;

    switchControl.loader = Loader();
    switchControl.isEnabled = false;
    switchControl.response = "";

    switchControl.patch = patch;
    switchControl.$onInit = init;

    //////////

    function init() {
      switchControl.isEnabled = switchControl.server.is_switch_ready;
    }

    function patch(data) {
      return switchControl.loader.during(
        switchControl.server
          .one('switch/'+switchControl.server.hub.id)
          .patch(data)
          .then(showResponse)
          .then(fireChangeEvent)
      );
    }

    function showResponse(response) {
      switchControl.response = response.data;
      return response;
    }

    function fireChangeEvent(response) {
      switchControl.server.fire('change');
      return response;
    }
  }
})();
