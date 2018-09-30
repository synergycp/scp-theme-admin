(function () {
  'use strict';

  angular
    .module('app.network.switch.list')
    .controller('SwitchIndexCtrl', SwitchIndexCtrl);

  /**
   * @ngInject
   */
  function SwitchIndexCtrl(SwitchList, ListFilter, Todo, $scope) {
    var vm = this;

    vm.list = SwitchList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'switch',
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
