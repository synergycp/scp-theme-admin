(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway.list')
    .controller('ForwardGatewayIndexCtrl', ForwardGatewayIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function ForwardGatewayIndexCtrl(ForwardGatewayList, ListFilter, Todo, $scope) {
    var vm = this;

    vm.list = ForwardGatewayList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'forward.gateway',
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
