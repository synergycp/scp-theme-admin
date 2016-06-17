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
  function PartIndexCtrl(_, $scope, $state, $stateParams, $uibModal, $q, List, Loader, Alert, EventEmitter, $timeout) {
    var vm = this;

    vm.list = EventEmitter();
    vm.loader = Loader();
    vm.search = $stateParams.search || '';
    vm.tabs = {
      active: parseInt($stateParams.tab) || 0,
      items: [
        new Tab('hardware.part.list.tab.disk', {
          part_type: 'disk',
        }),
        new Tab('hardware.part.list.tab.cpu', {
          part_type: 'cpu',
        }),
        new Tab('hardware.part.list.tab.mem', {
          part_type: 'mem',
        }),
        new Tab('hardware.part.list.tab.add-on', {
          part_type: 'add-on',
        }),
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
        .invokeMap('patchChanges')
        .flatten()
        .value()
        ;

      return vm.loader.during(
        $q.all(promises)
          .then(function (tabs) {
            return $q.when(tabs)
              .then(getChangedItems)
              .then(fireChangeEvent)
              .then(showSuccess)
              .catch(showWarning)
              ;
          })
          .catch(handleError)
      );

      function handleError(error) {
        Alert.danger('An unknown error has occurred.');
      }
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

    function Tab(trans, filters) {
      var tab = this;

      tab.text = trans;
      tab.list = List('part').filter(filters);
      var doDelete = tab.list.delete;
      tab.list.delete = listDelete;
      tab.list.add = listAdd;
      tab.patchChanges = patchChanges;
      tab.active = false;

      function listAdd() {
        tab.list.items.push({});
      }

      function listDelete(items) {
        var idItems = _.filter(items, 'id');
        if (idItems.length) {
          return doDelete(idItems)
            .catch(handleError);
        }

        _(items).reject('id').map(_.remove.bind(_, tab.list.items)).value();

        function handleError(response) {
          if (response.data.data.missing_part_id) {
            return showMergeModal(idItems);
          }

          throw response;
        }
      }

      function patchChanges() {
        return $q.all(
          _(tab.list.items)
            .map(patch)
            .filter()
            .value()
        );

        function patch(item) {
          var formData = {
            name: item.name,
            billing_id: item.billing_id,
            part_type: filters.part_type,
          };

          if (!item.id) {
            return tab.list.create(formData, {
              reload: false,
            }).then(function (createdItem) {
              _.assign(item, createdItem);

              $timeout(function() {
                _.invokeMap(getFormElems(item.id), '$setPristine');
              });

              return createdItem;
            });
          }

          var formElems = getFormElems(item.id);

          if (!_.some(formElems, '$dirty')) {
            return;
          }

          return item.patch(formData).then(function (response) {
            _.invokeMap(formElems, '$setPristine');

            return response;
          });
        }
      }

      function getFormElems(id) {
        return [
          $scope.form[id+'.name'],
          $scope.form[id+'.billing_id'],
        ];
      }

      function showMergeModal(items) {
        var modal = $uibModal.open({
          templateUrl: 'app/hardware/part/modal/modal.merge.html',
          controller: 'PartModalMergeCtrl',
          bindToController: true,
          controllerAs: 'modal',
          resolve: {
            items: function () {
              return items;
            },
          },
        });

        return modal.result.then(function (item) {
          return doDelete(items, {
            replace_part_id: item.id,
          });
        });
      }
    }

    function load(tab) {
      tab.list.load();

      return tab;
    }
  }
})();
