(function () {
  'use strict';

  angular
    .module('app.network.switch.list')
    .controller('SwitchIndexCtrl', SwitchIndexCtrl);

  /**
   * @ngInject
   */
  function SwitchIndexCtrl(SwitchList, ListFilter, Todo, $scope, _, $q) {
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
      var data = vm.create.getData();
      vm.list.create(data.switch)
        .then(function (createdSwitch) {
          return $q.all(_.map(data.uplinks.add, function (uplink) {
            return createdSwitch.all(createdSwitch.id + '/uplink').post(uplink);
          }));
        })
        .then(Todo.refresh);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
