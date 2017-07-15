(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('ServerInventoryCtrl', ServerInventoryCtrl)
    ;

  /**
   * ServerInventory Controller
   *
   * @ngInject
   */
  function ServerInventoryCtrl(ServerList, ListFilter, $scope) {
    var vm = this;

    vm.list = ServerList()
      .filter({
        inventory: 1,
      })
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'server',
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
