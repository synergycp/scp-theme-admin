(function () {
  'use strict';

  angular
    .module('app.system.integration.key')
    .controller('IntegrationKeyListCtrl', IntegrationKeyListCtrl)
  ;

  /**
   * @ngInject
   */
  function IntegrationKeyListCtrl($state, _, ApiKeyList, ListFilter) {
    var vm = this;

    vm.list = ApiKeyList('system.integration.key').filter({
      'owner.type': 'api.integration',
      'owner.id': $state.params.id,
    });
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.integrationId = $state.params.id;

    vm.logs = {
      filter: {
        target_type: 'api.integration',
        target_id: $state.params.id,
      },
    };
    vm.viewState = viewState;

    activate();

    ////////////

    function viewState(row) {
      return 'app.system.integration.view.key.view({'+
        'id: ' + vm.integrationId + ',' +
        'key: ' + row.id +
      '})';
    }

    function activate() {
      vm.list.load();
    }

    function create() {
      vm.list.create(_.assign(vm.create.getData(), {
        type: 'integration',
        owner_id: vm.integrationId,
      }));
    }
  }
})();
