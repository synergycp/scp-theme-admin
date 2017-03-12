(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .controller('InstallIndexCtrl', InstallIndexCtrl)
    ;

  /**
   * InstallIndex Controller
   *
   * @ngInject
   */
  function InstallIndexCtrl(OsReloadList, OsReloadModals, $scope) {
    var vm = this;

    vm.list = OsReloadList().limitScope($scope);
    vm.list.onDelete = onDelete;
    vm.list.queueInstall = queueInstall;
    activate();

    //////////

    function activate() {
    }

    function onDelete(install) {
      OsReloadModals.openDelete(install).result.then(function (result) {
        vm.list.delete([install], { restart: result.restartInstall });
      })
    }

    function queueInstall(install) {
      vm.list.delete([install], { restart: result.restartInstall });
    }
  }
})();
