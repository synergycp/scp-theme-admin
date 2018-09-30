(function () {
  'use strict';

  angular
    .module('app.pxe.shell.list.filters')
    .controller('ShellFiltersCtrl', ShellFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function ShellFiltersCtrl(Select, Observable, $state, $q, $timeout) {
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
        // filters.shell.setSelectedId($state.params['shell']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.shell.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // shell: filters.shell.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'shell': filters.current.shell,
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
