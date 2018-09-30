(function () {
  'use strict';

  angular
    .module('app.pxe.iso.list.filters')
    .controller('IsoFiltersCtrl', IsoFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function IsoFiltersCtrl(Select, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {
    };
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      _.assign(filters.current, {
        q: $state.params.q,
      });
      var promises = [
        $timeout(),
        // filters.iso.setSelectedId($state.params['iso']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.iso.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // iso: filters.iso.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'iso': filters.current.iso,
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
