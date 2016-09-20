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
      return vm.loader.during(
        $api
          .post(vm.form.getData())
          .then(getServerOffResponse)
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
  }
})();
