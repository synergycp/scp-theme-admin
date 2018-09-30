(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('SSHKeyHomeCtrl', SSHKeyHomeCtrl)
    ;

  /**
   * Home SSHKey Controller
   *
   * @ngInject
   */
  function SSHKeyHomeCtrl(Api, Loader, Modal) {
    var vm = this;
    var $api = Api.all('/system/ssh/key');

    vm.loader = Loader();
    vm.sshKey = null;
    vm.deleteKey = deleteKey;

    vm.generateKey = generateKey;

    activate();

    //////////

    function activate() {
      refresh();
    }

    function deleteKey() {
      return Modal.confirm([], 'ssh-key.delete.confirm')
        .open()
        .result
        .then(doRemove);
    }

    function doRemove() {
      return vm.loader.during(
        vm.sshKey
          .remove()
          .then(function () {
            vm.sshKey = null;
          })
      );
    }

    function refresh() {
      return vm.loader.during(
        $api.getList()
          .then(function (items) {
            if (items[0]) {
              _.assign(vm.sshKey || (vm.sshKey = {}), items[0]);
            } else {
              vm.sshKey = null;
            }
          })
      );
    }

    function generateKey() {
      return vm.loader.during(
        $api.post()
          .then(refresh)
      );
    }
  }
})();
