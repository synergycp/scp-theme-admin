(function () {
  'use strict';

  angular
    .module('app.network.entity.list')
    .controller('EntityIndexCtrl', EntityIndexCtrl);

  /**
   * @ngInject
   */
  function EntityIndexCtrl(ListFilter, EntityList, Todo, $scope) {
    var vm = this;

    vm.list = EntityList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      submit: create,
    };

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
        .then(Todo.refresh);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
