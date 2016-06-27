(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverIpmiControl', {
      require: {},
      bindings: {
        server: '=',
      },
      controller: 'ServerIpmiControlCtrl as ipmiControl',
      transclude: true,
      templateUrl: 'app/hardware/server/ipmi/ipmi.html'
    })
    .controller('ServerIpmiControlCtrl', ServerIpmiControlCtrl);

  /**
   * @ngInject
   */
  function ServerIpmiControlCtrl(Api, Loader, $scope, $state) {
    var ipmiControl = this;

    $scope.$state = $state;

    ipmiControl.loader = Loader();
    ipmiControl.isEnabled = false;
    ipmiControl.response = "";
    ipmiControl.power = {
      status: '',
      checked: null,
      load: loadPower,
      fresh: freshPower,
    };
    ipmiControl.client = {
      username: '',
      password: '',
      toggle: toggleClient,
      add: patch.bind(null, { add_user: true }),
      rem: patch.bind(null, { delete_user: true }),
    };

    ipmiControl.patch = patch;
    ipmiControl.$onInit = init;

    //////////

    function init() {
      ipmiControl.isEnabled = ipmiControl.server.is_ipmi_ready;
      ipmiControl.power.load();
    }

    function patch(data) {
      return ipmiControl.loader.during(
        ipmiControl.server
          .all('ipmi')
          .patch(data)
          .then(storePower)
          .then(fireChangeEvent)
      );
    }

    function fireChangeEvent(response) {
      ipmiControl.server.fire('change');
      return response;
    }

    function loadPower() {
      return ipmiControl.loader.during(
        ipmiControl.server
          .one('ipmi')
          .get()
          .then(storePower)
      );
    }

    function freshPower() {
      return patch({ rf: true });
    }

    function toggleClient() {
      var act = ipmiControl.client.username ? 'rem' : 'add';

      return ipmiControl.client[act]();
    }

    function storePower(response) {
      ipmiControl.client.username = response.client_user;
      ipmiControl.client.password = response.client_pass;
      ipmiControl.power.status = response.power_status_desc;
      ipmiControl.power.checked = Date.parse(response.checked_at.iso_8601);

      return response;
    }
  }
})();
