(function () {
  'use strict';

  angular
    .module('app.pxe.preseed.list.filters')
    .controller('PreseedFiltersCtrl', PreseedFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function PreseedFiltersCtrl(Select, Observable, $state, $q, $timeout) {
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
        // filters.preseed.setSelectedId($state.params['preseed']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.preseed.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // preseed: filters.preseed.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'preseed': filters.current.preseed,
        'q': filters.current.q,
      }, {location: 'replace'});

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
