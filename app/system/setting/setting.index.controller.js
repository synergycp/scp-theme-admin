(function () {
  'use strict';

  var STATE = 'app.system.setting.list';
  var API = {
    SETTING: 'system/setting',
    SETTING_GROUP: 'setting-group?per_page=1000',
    INTEGRATION: 'integration',
    API_KEY: 'key',
  };

  angular
    .module('app.system.setting')
    .controller('SettingIndexCtrl', SettingIndexCtrl);

  /**
   * SettingIndex Controller
   *
   * @ngInject
   */
  function SettingIndexCtrl(_, $scope, $state, $stateParams, $q, Loader, Alert, EventEmitter, Api, SettingLang, $timeout) {
    var vm = this;
    var $api = Api.all(API.SETTING);
    var $groups = Api.all(API.SETTING_GROUP);

    vm.list = EventEmitter();
    vm.loader = Loader();
    vm.tabs = {
      active: parseInt($stateParams.tab) || 0,
      items: [],
      change: changeTab,
    };
    vm.submit = onSubmit;

    vm.logs = {
      filter: {
        target_type: 'setting',
      },
    };

    setTimeout(activate, 1);

    //////////

    function activate() {
      $q.all([
        loadSettingsTabs(),
      ]).then(setActive);
    }

    function setActive() {
      vm.tabs.items[vm.tabs.active].active = true;
    }

    function changeTab(active) {
      $stateParams.tab = vm.tabs.active = active;
      $state.go(STATE, $stateParams);
    }

    function loadSettingsTabs() {
      return $groups
        .getList()
        .then(function (groups) {
          setPkg(groups);
          SettingLang.load(groups);
          _.each(groups.reverse(), addSettingTab);
        });
    }

    function setPkg(groups) {
      _.forEach(groups, function(group) {
        _.forEach(group.settings, function(setting) {
          if(setting.slug.startsWith('pkg.')) {
            var secondDotIndex = setting.slug.indexOf('.', 4);
            setting['pkg'] = setting.slug.substr(4, secondDotIndex-4); // i.e. pick `abuse` from `pkg.abuse.some_name`
            setting['lang'] = setting.slug.substr(secondDotIndex+1);
          }
        })
      })
    }

    function addSettingTab(group) {
      vm.tabs.items.unshift(
        new SettingsTab(group.name, group.settings, group.parent)
      );
    }

    function onSubmit() {
      var promises = _(vm.tabs.items)
        .invokeMap('patchChanges')
        .filter()
        .flatten()
        .value();

      return vm.loader.during(
        $q.all(promises)
          .catch(handleError)
          .branch()
            .then(getChangedItems)
            .then(fireChangeEvent)
            .then(showSuccess)
            .catch(showWarning)
          .unbranch()
      );

      function handleError(error) {
        Alert.danger('An unknown error has occurred.');

        throw error;
      }
    }

    function getChangedItems(tabs) {
      var items = _(tabs)
        .flatten()
        .value();

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
        changes + ' setting' + (changes === 1 ? '' : 's') + ' updated'
      );

      return items;
    }

    function showWarning() {
      Alert.warning('No changes found');

      return [];
    }

    function SettingsTab(trans, items, parent) {
      var tab = this;

      tab.text = trans;
      tab.items = items;
      tab.patchChanges = patchChanges;
      tab.active = false;
      tab.visible = true;
      tab.body = 'app/system/setting/setting.list.html';

      if (parent) {
        $timeout(function() {
          var elem = getFormElems(parent.id)[0];
          elem.$viewChangeListeners.push(setVisibility);
          setVisibility();

          function setVisibility() {
            tab.visible = elem.$viewValue === parent.value;
          }
        });
      }

      function patchChanges() {
        return $q.all(
          _(tab.items)
            .map(patch)
            .filter()
            .value()
        );

        function patch(item) {
          var formElems = getFormElems(item.id);

          if (!_.some(formElems, '$dirty')) {
            return;
          }

          var formData = {
            value: item.value,
          };

          return $api.one("" + item.id)
            .patch(formData)
            .then(setFormToClean);

          function setFormToClean(response) {
            _.invokeMap(formElems, '$setPristine');

            return response;
          }
        }
      }

      function getFormElems(id) {
        return [
          $scope.form[id + '.value'],
        ];
      }
    }
  }
})();
