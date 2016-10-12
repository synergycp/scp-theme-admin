(function () {
  'use strict';

  angular
    .module('app.network.switch.speed.list.filters')
    .controller('SwitchSpeedFiltersCtrl', SwitchSpeedFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchSpeedFiltersCtrl(Select, Observable, $state, $q, $timeout) {
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
        // filters.switch.setSelectedId($state.params['switch']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.switch.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // switch: filters.switch.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'switch': filters.current.switch,
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
