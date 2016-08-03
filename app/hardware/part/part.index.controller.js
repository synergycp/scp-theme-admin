(function () {
  'use strict';

  var STATE = 'app.hardware.part.list';

  angular
    .module('app.hardware.part')
    .controller('PartIndexCtrl', PartIndexCtrl)
    ;

  /**
   * PartIndex Controller
   *
   * @ngInject
   */
  function PartIndexCtrl(_, $scope, $state, $stateParams, $q, Loader, Alert, EventEmitter, PartList, PartTab) {
    var vm = this;

    vm.list = EventEmitter();
    vm.loader = Loader();
    vm.search = $stateParams.search || '';
    vm.tabs = {
      active: parseInt($stateParams.tab) || 0,
      items: [
        tab('disk'),
        tab('cpu'),
        tab('mem'),
        tab('add-on'),
      ],
      change: changeTab,
    };
    vm.submit = onSubmit;

    vm.tabs.items[vm.tabs.active].active = true;

    vm.logs = {
      filter: {
        target_type: 'part',
      },
    };
    vm.searchChange = onSearchChange;

    activate();

    //////////

    function activate() {
      onSearchChange();
    }

    function changeTab(active) {
      $stateParams.tab = vm.tabs.active = active;
      $state.go(STATE, $stateParams);
    }

    function onSearchChange() {
      $stateParams.search = vm.search;
      $state.go(STATE, $stateParams);
      loadAllTabs();
    }

    function loadAllTabs() {
      return $q.all(
        _(vm.tabs.items)
          .map(syncFilters)
          .map(load)
          .value()
      );

      function syncFilters(tab) {
        tab.list.filter({
          q: vm.search,
        });

        return tab;
      }
    }

    function onSubmit() {
      var promises = _(vm.tabs.items)
        .invokeMap('syncChanges')
        .flatten()
        .value()
        ;

      return vm.loader.during(
        $q.all(promises)
          .branch()
            .then(getChangedItems)
            .then(fireChangeEvent)
            .then(showSuccess)
            .catch(showWarning)
          .unbranch()
      );
    }

    function getChangedItems(tabs) {
      var items = _(tabs)
        .flatten()
        .value()
        ;

      if (!items.length) {
        return $q.reject('No changes found');
      }

      return items;
    }

    function fireChangeEvent(items) {
      vm.list.fire('change');

      return items;
    }

    function showSuccess(items) {
      return items;
      var changes = items.length;

      Alert.success(
        changes + ' part' + (changes === 1 ? '' : 's') + ' updated'
      );

      return items;
    }

    function showWarning() {
      Alert.warning('No changes found');

      return [];
    }

    function tab(partType) {
      return PartTab(
        PartList(),
        partType,
        $scope
      );
    }

    function load(tab) {
      tab.list.load();

      return tab;
    }
  }
})();
