(function () {
  'use strict';

  angular
    .module('app.network')
    .controller('EntityListCtrl', EntityListCtrl);

  /**
   * @ngInject
   */
  function EntityListCtrl(List, Select, $stateParams) {
    var vm = this;

    vm.list = List('entity').filter({
      group: $stateParams.group,
    });
    vm.list.bulk.add('Delete', vm.list.delete);

    vm.create = {
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'entity',
      },
    };

    vm.filters = {
      visible: false,
      group: Select('group')
        .on('change', syncFilters),
      server: Select('server')
        .on('change', syncFilters)
        .addItem({
          id: 'none',
          text: 'None'
        }),
      filter: {},
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }

    function syncFilters() {
      vm.list.filter({
        group: vm.filters.group.getSelected('id'),
        server: vm.filters.server.getSelected('id'),
      }).load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
