(function () {
  'use strict';

  angular
    .module('app.system.log.list.filters')
    .controller('LogFiltersCtrl', LogFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function LogFiltersCtrl(Select, Observable, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      filters.current = filters.current || {};

      var promises = [
        $timeout(),
        // filters.log.setSelectedId($state.params['log']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.log.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // log: filters.log.getSelected('id'),
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
