(function () {
  'use strict';

  angular
    .module('app.network.group.list')
    .controller('GroupIndexCtrl', GroupIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function GroupIndexCtrl(GroupList, ListFilter, Todo, $scope) {
    var vm = this;

    vm.list = GroupList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'group',
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
