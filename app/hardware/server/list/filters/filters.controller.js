(function () {
  'use strict';

  angular
    .module('app.hardware.server.list.filters')
    .controller('ServerFiltersCtrl', ServerFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerFiltersCtrl(Select, MultiInput, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {
      q: $state.params.q,
    };
    filters.group = Select('group').multi();
    filters.client = Select('client').multi();
    filters.switch = Select('switch').multi();
    filters.cpu = Select('part').filter({'part_type':'cpu'}).multi();
    filters.mem = Select('part').filter({'part_type':'mem'}).multi();
    // filters.disks = MultiInput(DiskSelector)
    //   .add();
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      var promises = [
        $timeout(),
        filters.group.setSelectedId($state.params['group']),
        filters.client.setSelectedId($state.params['client']),
        filters.switch.setSelectedId($state.params['switch']),
        filters.cpu.setSelectedId($state.params['cpu']),
        filters.mem.setSelectedId($state.params['mem']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      filters.group.on('change', fireChangeEvent);
      filters.client.on('change', fireChangeEvent);
      filters.switch.on('change', fireChangeEvent);
      filters.cpu.on('change', fireChangeEvent);
      filters.mem.on('change', fireChangeEvent);
      // filters.disks.items[0].on('change', fireChangeEvent);
      // filters.disks.on('add', multiInputBindChangeEvent.bind(null, filters.disks));
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        group: (filters.group.selected || []).map(getObjId).join(','),
        client: (filters.client.selected || []).map(getObjId).join(','),
        switch: (filters.switch.selected || []).map(getObjId).join(','),
        cpu: (filters.cpu.selected || []).map(getObjId).join(','),
        mem: (filters.mem.selected || []).map(getObjId).join(','),
        // disks: (filters.disks.selected || []).map(getObjId).join(','),
      });

      $state.go($state.current.name, {
        'group': filters.current.group,
        'client': filters.current.client,
        'switch': filters.current.switch,
        'cpu': filters.current.cpu,
        'mem': filters.current.mem,
        // 'disks': filters.current.disks,
        'q': filters.current.q,
      });

      if (filters.change) {
        filters.change();
      }
    }

    function multiInputBindChangeEvent(multiInput, item) {
      item.on('change', fireChangeEvent);
    }

    function $onChanges(changes) {
      if (changes.show) {
        var onShow = filters.searchFocus.set.bind(null, true);
        (changes.show.currentValue ? onShow : angular.noop)();
      }
    }

    function DiskSelector(selected) {
      var select = Select('part').filter({'part_type':'disk'});
      select.selected = selected || null;
      select.load();

      return select;
    }

    function getObjId(obj) {
      return obj.id;
    }
  }
})();
