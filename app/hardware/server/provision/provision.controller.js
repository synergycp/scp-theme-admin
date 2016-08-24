(function () {
  'use strict';

  angular
    .module('app.hardware.server')
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

    activate();

    //////////

    function activate() {
    }

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
