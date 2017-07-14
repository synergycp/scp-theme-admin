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
  function SettingIndexCtrl(_, $scope, $state, $stateParams, $q, Loader, Alert, EventEmitter, Api, SettingLang, SettingsTab, HttpTab, $timeout) {
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
    vm.refresh = refresh;
    vm.patchSetting = patchSetting;
    vm.onChangesPatch = onChangesPatch;

    vm.logs = {
      filter: {
        target_type: 'setting',
      },
    };

    EventEmitter().bindTo(vm);

    setTimeout(activate, 1);

    //////////

    function activate() {
      vm.tabs.items.push(new HttpTab(vm));
      $q.all([
        loadSettingsTabs(),
      ]).then(setActive);
    }

    function refresh() {
      return $groups
        .getList()
        .then(function (groups) {
          _.each(groups, refreshSettingTab)
        })
      ;

      function refreshSettingTab(group) {
        var items = _.find(vm.tabs.items, {
          id: group.id,
        }).items;

        _.each(group.settings, function (setting) {
          _.find(items, {
            id: setting.id,
          }).value = setting.value;
        });
      }
    }

    function setActive() {
      (vm.tabs.items[vm.tabs.active] || {}).active = true;
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
          addSettingTabs(groups);
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

    function addSettingTabs(groups) {
      var settingsObj = getAllSettingsObj(groups);
      _.each(groups, addTab);

      function addTab(group) {
        vm.tabs.items.push(
          new SettingsTab(vm, group.id, group.name, group.settings, group.parent, 
            group.parent && settingsObj[group.parent.id])
        );
      }

      function getAllSettingsObj(groups) {
        return _.reduce(groups, function(acc, group) {
          _.each(group.settings, function(setting) {
            acc[setting.id] = setting;
          })
          return acc;
        }, {})
      }
    }

    function onChangesPatch(patchCalls) {
      return vm.loader.during(
        $q
          .all(
            patchCalls
          )
          .catch(handleError)
          .branch()
            .then(getChangedItems)
            .then(fireChangeEvent)
            .then(showSuccess)
            .catch(showWarning)
          .unbranch()
      );
    }

    function patchSetting(id, formData) {
      return $api.one("" + id)
        .patch(formData)
    }

    function handleError(error) {
      Alert.danger('An unknown error has occurred.');

      throw error;
    }

    function getChangedItems(items) {
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
  }
})();
