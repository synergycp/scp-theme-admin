(function () {
  'use strict';

  angular
    .module('app.network.entity.filters')
    .controller('EntityFiltersCtrl', EntityFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function EntityFiltersCtrl(Select, $state, $q) {
    var filters = this;

    filters.$onInit = init;
    filters.current = {};
    filters.group = Select('group');
    filters.server = Select('server')
      .addItem({
        id: 'none',
        text: 'Unassigned'
      });

    //////////

    function init() {
      $q.all([
        filters.group.setSelectedId($state.params['group.id']),
        filters.server.setSelectedId($state.params['server.id']),
      ]).then(listenForChanges);
    }

    function listenForChanges() {
      filters.group.on('change', fireChangeEvent);
      filters.server.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        group: filters.group.getSelected('id'),
        server: filters.server.getSelected('id'),
      });

      $state.go($state.current.name, {
        'group.id': filters.current.group,
        'server.id': filters.current.server,
      });

      if (filters.change) {
        filters.change();
      }
    }
  }
})();
