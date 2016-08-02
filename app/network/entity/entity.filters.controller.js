(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .controller('EntityFiltersCtrl', EntityFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function EntityFiltersCtrl(Select, $stateParams) {
    var filters = this;

    filters.$onInit = init;
    filters.current = {};
    filters.group = Select('group').on('change', fireChangeEvent);
    filters.server = Select('server')
      .on('change', fireChangeEvent)
      .addItem({
        id: 'none',
        text: 'Unassigned'
      });

    //////////

    function init() {
      _.defaults(filters.current, {
        group: $stateParams.group,
      });
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        group: filters.group.getSelected('id'),
        server: filters.server.getSelected('id'),
      });

      if (filters.change) {
        filters.change();
      }
    }
  }
})();
