(function () {
  'use strict';

  angular
    .module('app.hardware.console.list')
    .controller('HardwareConsoleSessionIndexCtrl', HardwareConsoleSessionIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function HardwareConsoleSessionIndexCtrl(ConsoleSessionList, $scope) {
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
