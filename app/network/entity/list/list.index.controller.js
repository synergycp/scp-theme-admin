(function () {
  'use strict';

  angular
    .module('app.network.entity.list')
    .controller('EntityIndexCtrl', EntityIndexCtrl);

  /**
   * @ngInject
   */
  function EntityIndexCtrl(ListFilter, EntityList, EventEmitter, Todo, $scope) {
    var vm = this;

    vm.list = EntityList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

    vm.logs = {
      filter: {
        target_type: 'entity',
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
