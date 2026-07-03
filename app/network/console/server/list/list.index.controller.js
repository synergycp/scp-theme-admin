(function () {
  'use strict';

  angular
    .module('app.network.console.server.list')
    .controller('ConsoleServerIndexCtrl', ConsoleServerIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function ConsoleServerIndexCtrl(ConsoleServerList, ListFilter, Todo, $scope, Api, Alert) {
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

    vm.catalogRefreshing = false;
    vm.refreshCatalog = refreshCatalog;

    activate();

    function refreshCatalog() {
      if (vm.catalogRefreshing) return;
      vm.catalogRefreshing = true;
      Api.all('server/console/type/refresh').post({})
        .then(function () {
          Alert.success('Console image catalog refreshed');
        })
        .catch(function () {
          Alert.warning('Failed to refresh console image catalog');
        })
        .finally(function () {
          vm.catalogRefreshing = false;
        });
    }

    function activate() {
      vm.list.load();
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
