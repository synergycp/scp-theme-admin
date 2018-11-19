(function () {
  'use strict';

  angular
    .module('app.hardware.server.provision')
    .controller('ServerProvisionCtrl', ServerProvisionCtrl)
    ;

  /**
   * ServerProvision Controller
   *
   * @ngInject
   */
  function ServerProvisionCtrl(Api, $state, Loader) {
    var vm = this;
    var $api = Api.all('server/provision');

    vm.loader = Loader();
    vm.submit = submit;
    vm.form = {};
    vm.input = {
      serverId: $state.params['server.id'],
      clientId: $state.params['client.id'],
    };

    //////////

    function submit() {
      var data = vm.form.getData();
      if(!data) return;
      var osReloadsToQueue = data.osReloads.slice(1); // the first one was already queued
      delete data.osReloads;
      return vm.loader.during(
        $api
          .post(data)
          .then(getServerOffResponse)
          .then(queueOsReloads.bind(null, osReloadsToQueue, data.password))
          .then(clearFromServerChoices)
          .then(addToProvisionedServers)
      );
    }

    function getServerOffResponse(response) {
      return response.server;
    }

    function clearFromServerChoices(server) {
      $state.go('app.hardware.server.view.manage', {
        id: server.id,
      });
    }

    function addToProvisionedServers() {

    }

    function queueOsReloads(osReloads, password, server) {
      nextRequest();

      function nextRequest() {
        if(!osReloads.length) return;
        var osReload = osReloads[0];
        var data = {
          pxe_profile_id: osReload.profile.id,
          disk: {
            raid: osReload.raid,
            index: osReload.index,
          },
          queue: true,
          edition_id: osReload.edition,
          license_key: osReload.licenseKey,
          password: password,
        }
        Api.all('server/'+server.id+'/install')
          .post(data)
          .then(function() {
            osReloads.splice(0, 1);
            nextRequest();
          })
      }
      return server;
    }
  }
})();
