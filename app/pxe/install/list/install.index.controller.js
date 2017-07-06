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
  function InstallIndexCtrl(OsReloadList, OsReloadModals, $scope, EventEmitter, Todo) {
    var vm = this;

    vm.list = OsReloadList()
      .limitScope($scope)
      .setPaginationAndSortToUrl();
    vm.list.onDelete = onDelete;
    vm.list.queueInstall = queueInstall;
    vm.list.reloadServer = reloadServer;
    vm.create = {};
    EventEmitter().bindTo(vm.create);
    activate();

    vm.create.on('created', function() {
      vm.list.refresh.now();
      Todo.refresh();
    });

    //////////

    function activate() {
      $scope.$on('$destroy', onDestroy);
    }

    function onDelete(install) {
      OsReloadModals.openDelete(install).result.then(function (result) {
        vm.list.delete(install, { restart: result.restartInstall });
      })
    }

    function queueInstall(install) {
      vm.list.delete([install], { restart: result.restartInstall });
    }

    function reloadServer(server) {
      vm.create.fire('reload_server', server);
      vm.list.scrollToAnchor('pxe-install-form');
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
