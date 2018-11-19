(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeFileIndexCtrl', PxeFileIndexCtrl);

  /**
   * @ngInject
   */
  function PxeFileIndexCtrl(PxeFileList, ListFilter, $scope) {
    var vm = this;

    vm.list = PxeFileList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.file',
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
