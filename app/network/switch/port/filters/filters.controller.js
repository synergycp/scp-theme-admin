(function () {
  'use strict';

  angular
    .module('app.network.switch.port.filters')
    .controller('SwitchPortFiltersCtrl', SwitchPortFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchPortFiltersCtrl(Select, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {};
    filters.searchFocus = Observable(false);
    filters.server = Select('server');
    filters.speed = Select('port-speed');

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      var promises = [
        $timeout(),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      filters.server.on('change', fireChangeEvent);
      filters.speed.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        server: filters.server.getSelected('id'),
        speed: filters.speed.getSelected('id'),
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
