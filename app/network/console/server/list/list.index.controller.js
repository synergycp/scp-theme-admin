(function () {
  'use strict';

  angular
    .module('app.network.console.server.list')
    .controller('ConsoleServerIndexCtrl', ConsoleServerIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function ConsoleServerIndexCtrl(ConsoleServerList, ListFilter, Todo, $scope) {
    var vm = this;

    vm.list = ConsoleServerList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'console.server',
      },
    };

    activate();

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
