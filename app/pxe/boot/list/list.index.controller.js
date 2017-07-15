(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('BootIndexCtrl', BootIndexCtrl);

  /**
   * @ngInject
   */
  function BootIndexCtrl(PxeBootList, ListFilter, $scope) {
    var vm = this;

    vm.list = PxeBootList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.boot-script',
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
