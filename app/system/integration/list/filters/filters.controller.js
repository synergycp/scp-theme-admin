(function () {
  'use strict';

  angular
    .module('app.system.integration.list.filters')
    .controller('IntegrationFiltersCtrl', IntegrationFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function IntegrationFiltersCtrl(Select, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {
      q: $state.params.q,
    };
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      var promises = [
        $timeout(),
        // filters.integration.setSelectedId($state.params['integration']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.integration.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // integration: filters.integration.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'integration': filters.current.integration,
        'q': filters.current.q,
      });

      if (filters.change) {
        filters.change();
      }
    }

    function $onChanges(changes) {
      if (changes.show) {
        var onShow = filters.searchFocus.set.bind(null, true);
        (changes.show.currentValue ? onShow : angular.noop)();
      }
    }
  }
})();
