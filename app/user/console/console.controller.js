(function () {
  'use strict';

  angular
    .module('app.user.console')
    .controller('UserConsoleSessionIndexCtrl', UserConsoleSessionIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function UserConsoleSessionIndexCtrl(ConsoleSessionList, Permission, $scope) {
    var vm = this;

    vm.list = ConsoleSessionList()
      .setPaginationAndSortToUrl();

    vm.logs = {
      filter: {
        target_type: 'console.server',
      },
    };

    vm.canWrite = false;

    activate();

    function activate() {
      vm.list.load();
      Permission.has('network.console_session.delete').then(function (can) {
        vm.canWrite = can;
      });
      $scope.$on('$destroy', onDestroy);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
