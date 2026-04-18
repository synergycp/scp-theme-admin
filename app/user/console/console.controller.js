(function () {
  'use strict';

  angular
    .module('app.user.console')
    .controller('UserConsoleSessionIndexCtrl', UserConsoleSessionIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function UserConsoleSessionIndexCtrl(ConsoleSessionList, $scope) {
    var vm = this;

    vm.list = ConsoleSessionList()
      .setPaginationAndSortToUrl();

    vm.logs = {
      filter: {
        target_type: 'console.server',
      },
    };

    activate();

    function activate() {
      vm.list.load();
      $scope.$on('$destroy', onDestroy);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
