(function () {
  'use strict';

  angular
    .module('app.network.entity.list.filters')
    .controller('EntityFiltersCtrl', EntityFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function EntityFiltersCtrl(Select, Search, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {};
    filters.group = Select('group');
    filters.server = Select('server')
      .addItem({
        id: 'none',
        text: 'Unassigned'
      });
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      _.assign(filters.current, {
        q: $state.params.q,
      });
      $q.all([
        filters.group.setSelectedId($state.params['group.id']),
        filters.server.setSelectedId($state.params['server.id']),
      ]).then(listenForChanges).then(fireChangeEvent);
    }

    function listenForChanges() {
      filters.group.on('change', fireChangeEvent);
      filters.server.on('change', fireChangeEvent);

      filters.shouldWatchMainSearch && Search.on('change', function(searchStr) {
        _.assign(filters.current, {
          q: searchStr
        });
      })
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        group: filters.group.getSelected('id'),
        server: filters.server.getSelected('id'),
      });

      filters.server
        .filter({
          ip_group: (filters.group.selected || {}).id,
        })
        .load();

      $state.go($state.current.name, {
        'group.id': filters.current.group,
        'server.id': filters.current.server,
        q: filters.current.q,
      }, {location: 'replace'});
      filters.shouldWatchMainSearch && Search.go(filters.current.q);

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
