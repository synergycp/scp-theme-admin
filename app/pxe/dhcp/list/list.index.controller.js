(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeDhcpIndexCtrl', PxeDhcpIndexCtrl);

  /**
   * @ngInject
   */
  function PxeDhcpIndexCtrl(PxeDhcpList, ListFilter, $scope) {
    var vm = this;

    vm.list = PxeDhcpList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.dhcp',
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
