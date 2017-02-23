(function () {
  'use strict';

  angular
    .module('app.system.integration.list')
    .controller('IntegrationIndexCtrl', IntegrationIndexCtrl);

  /**
   * @ngInject
   */
  function IntegrationIndexCtrl(IntegrationList, ListFilter) {
    var vm = this;

    vm.list = IntegrationList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'api.integration',
      },
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
