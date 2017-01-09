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
  function InstallIndexCtrl(OsReloadList, $scope) {
    var vm = this;

    vm.list = OsReloadList().limitScope($scope);
    vm.list.delete = onDelete.bind(null, vm.list.delete);

    activate();

    //////////

    function activate() {
    }

    function onDelete(deleteOsReload, install, restart) {
      deleteOsReload(install, { restart: restart })
    }
  }
})();
