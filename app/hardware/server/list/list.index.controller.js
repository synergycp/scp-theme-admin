(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerIndexCtrl', ServerIndexCtrl)
    ;

  /**
   * ServerIndex Controller
   *
   * @ngInject
   */
  function ServerIndexCtrl(ServerList, LicenseService, ListFilter, EventEmitter, Todo, $scope, Loader) {
    var vm = this;

    vm.list = ServerList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      input: {},
      submit: create,
      loader: Loader(),
    };
    EventEmitter().bindTo(vm.create);

    vm.create.on('created.relations', vm.list.refresh.now);

    vm.logs = {
      filter: {
        target_type: 'server',
      },
    };
    vm.licenseLoader = Loader();
    vm.licenseFull = false;
    vm.licenseRefresh = licenseRefresh;

    LicenseService.onChange(function () {
      LicenseService.getCanAddMoreServers()
        .then(storeCanAddMore);
    }).getCanAddMoreServers().then(storeCanAddMore);

    function storeCanAddMore(canAddMore) {
      vm.licenseFull = !canAddMore;
    }

    activate();

    ////////////

    function licenseRefresh() {
      return vm.licenseLoader.during(
        LicenseService.refresh()
      );
    }

    function activate() {
      $scope.$on('$destroy', onDestroy)
    }

    function create() {
      vm.list
        .create(vm.create.getData())
        .then(vm.create.fire.bind(null, 'created'))
        .then(Todo.refresh)
      ;
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
