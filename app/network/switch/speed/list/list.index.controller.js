(function () {
  'use strict';

  angular
    .module('app.network.switch.speed.list')
    .controller('SwitchSpeedIndexCtrl', SwitchSpeedIndexCtrl);

  /**
   * @ngInject
   */
  function SwitchSpeedIndexCtrl(SwitchSpeedList, ListFilter, $scope) {
    var vm = this;

    vm.list = SwitchSpeedList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'port-speed',
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
      ports.list.clearPaginationAndSortFromUrl();
    }
  }
})();
