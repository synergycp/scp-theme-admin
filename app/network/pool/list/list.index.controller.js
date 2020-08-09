(function () {
  'use strict';

  angular
    .module('app.network.pool.list')
    .controller('PoolIndexCtrl', PoolIndexCtrl);

  /**
   * @ngInject
   */
  function PoolIndexCtrl(ListFilter, PoolList, EventEmitter, Todo, $scope) {
    var vm = this;

    vm.list = PoolList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

    vm.logs = {
      filter: {
        target_type: 'ip.pool',
      },
    };

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
