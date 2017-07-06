(function () {
  'use strict';

  angular
    .module('app.user.client.list')
    .controller('ClientIndexCtrl', ClientIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientIndexCtrl(ClientList, ListFilter, $scope) {
    var vm = this;

    vm.list = ClientList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'client',
      },
    };

    activate();

    ////////////

    function activate() {
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      vm.list.create(vm.create.getData());
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
