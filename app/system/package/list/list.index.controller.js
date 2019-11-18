(function () {
  'use strict';

  angular
    .module('app.system.package.list')
    .controller('PackageIndexCtrl', PackageIndexCtrl);

  /**
   * @ngInject
   */
  function PackageIndexCtrl(PackageList, ListFilter, $scope, EventEmitter) {
    var vm = this;

    vm.list = PackageList()
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
        target_type: 'package',
      },
    };

    activate();

    ////////////

    function activate() {
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      vm.list.create(vm.create.getData())
        .then(vm.create.fire.bind(null, 'created'));
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
