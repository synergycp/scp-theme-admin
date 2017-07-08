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
    vm.refresh = refresh;

    vm.logs = {
      filter: {
        target_type: 'setting',
      },
    };

    EventEmitter().bindTo(vm);

    setTimeout(activate, 1);

    //////////

    function activate() {
      vm.tabs.items.push(new HttpTab());
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
          _.each(groups, addSettingTab);
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
      vm.tabs.items.push(
        new SettingsTab(group.id, group.name, group.settings, group.parent)
      );
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

    function SettingsTab(id, trans, items, parent) {
      var tab = this;

      tab.id = id;
      tab.text = trans;
      tab.items = items;
      tab.patchChanges = patchChanges;
      tab.getFormElems = getFormElems;
      tab.active = false;
      tab.visible = true;
      tab.form = {};
      tab.body = 'app/system/setting/setting.list.html';

      if (parent) {
        // If this tab has a parent, it is only shown when the parent setting value matches the selected one
        vm.on('change-'+parent.id, function (setting) {
          tab.visible = setting.value === parent.value;
        });
      }

      function patchChanges() {
        return vm.loader.during(
          $q
            .all(
              _(tab.items)
                .map(patch)
                .filter()
                .value()
            )
            .catch(handleError)
            .branch()
              .then(getChangedItems)
              .then(fireChangeEvent)
              .then(showSuccess)
              .catch(showWarning)
            .unbranch()
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
          tab.form[id + '.value'],
        ];
      }
    }

    function HttpTab() {
      var tab = this;
      var $api = Api.one('http/ssl');

      tab.trans = 'system.setting.http.TITLE';
      tab.active = false;
      tab.visible = true;
      tab.body = 'app/system/setting/setting.http.html';
      tab.ssl = {
        loader: Loader(),
        input: {
          // TODO auto fill user email
          email: '',
        },
        enabled: false,
        required: false,
        refresh: refreshSsl,
        disable: disableSsl,
        enable: enableSsl,
        patch: patchSsl,
      };
      tab.patchChanges = patchChanges;

      activate();

      //////////////

      function activate() {
        tab.ssl.refresh();
      }

      function patchChanges() {
      }

      function patchSsl(data) {
        return tab.ssl.loader.during(
          $api
            .patch(data)
            .then(storeSslStatus)
            .then(vm.refresh)
        );
      }

      function disableSsl() {
        return tab.ssl.loader.during(
          $api
            .remove()
            .then(function () {
              tab.ssl.enabled = false;
              tab.ssl.required = false;
            })
            .then(vm.refresh)
        );
      }

      function enableSsl() {
        return tab.ssl.loader.during(
          Api
            .all('http/ssl')
            .post({
              email: tab.ssl.input.email,
            })
            .then(storeSslStatus)
            .then(vm.refresh)
        );
      }

      function refreshSsl() {
        return tab.ssl.loader.during(
          $api
            .get()
            .then(storeSslStatus)
        );
      }

      function storeSslStatus(response) {
        tab.ssl.enabled = response.enabled;
        tab.ssl.required = response.required;
      }
    }
  }
})();
