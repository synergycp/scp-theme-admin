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
  function ServerInventoryCtrl(ServerList, LicenseService, ListFilter, $scope, EventEmitter, Todo) {
    var vm = this;
    // TODO: DRY this up by extending the server list controller?

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
    EventEmitter().bindTo(vm.create);

    vm.create.on('created.relations', vm.list.refresh.now);

    vm.logs = {
      filter: {
        target_type: 'server',
      },
    };
    vm.licenseFull = false;

    LicenseService.onChange(function () {
      LicenseService.getCanAddMoreServers()
        .then(storeCanAddMore);
    }).getCanAddMoreServers().then(storeCanAddMore);

    function storeCanAddMore(canAddMore) {
      vm.licenseFull = !canAddMore;
    }

    activate();

    ////////////

    function activate() {
      $scope.$on('$destroy', onDestroy);

    }

    function create() {
      vm.list.create(vm.create.getData())
        .then(vm.create.fire.bind(null, 'created'))
        .then(Todo.refresh);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
