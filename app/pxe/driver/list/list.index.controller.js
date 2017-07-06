(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeDriverIndexCtrl', PxeDriverIndexCtrl);

  /**
   * @ngInject
   */
  function PxeDriverIndexCtrl(PxeDriverList, ListFilter, $scope) {
    var vm = this;

    vm.list = PxeDriverList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.driver',
      },
    };

    activate();

    ////////////

    function activate() {
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      vm.list.create(vm.create.getData());
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
