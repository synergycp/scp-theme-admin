(function () {
  'use strict';

  angular
    .module('app.system.log.list')
    .controller('LogIndexCtrl', LogIndexCtrl);

  /**
   * @ngInject
   */
  function LogIndexCtrl(List, ListFilter, $state, $scope) {
    var vm = this;

    vm.list = List('log')
      .filter({})
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);
    vm.filters.current.q = $state.params.q;
    vm.filters.on('change', function () {
      $state.go($state.current.name, vm.filters.current);
    });

    activate();

    ////////////

    function activate() {
      $scope.$on('$destroy', onDestroy);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
