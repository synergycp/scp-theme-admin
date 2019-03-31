(function () {
  'use strict';

  angular
    .module('app.user.client.list')
    .controller('ClientIndexCtrl', ClientIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientIndexCtrl(ClientList, ListFilter, $scope, EventEmitter) {
    var vm = this;

    vm.list = ClientList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

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
      vm.list.create(vm.create.getData())
        .then(vm.create.fire.bind(null, 'created'));
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
