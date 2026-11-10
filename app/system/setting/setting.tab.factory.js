(function () {
  'use strict';

  angular
    .module('app.system.setting')
    .factory('SettingsTab', SettingsTab);

  /**
   * SettingsTab Factory
   *
   * @ngInject
   */
  function SettingsTab(_, $q, Loader, Api) {
    return function(vm, id, trans, items, parent, parentActualSetting) {
      var tab = this;

      tab.id = id;
      tab.text = trans;
      tab.items = items;
      tab.patchChanges = patchChanges;
      tab.getFormElems = getFormElems;
      tab.onFieldChanged = onFieldChanged;
      tab.active = false;
      tab.visible = true;
      tab.form = {};
      tab.body = 'app/system/setting/setting.list.html';

      if (parent) {
        // If this tab has a parent, it is only shown when the parent setting value matches the selected one
        tab.visible = parent.value == parentActualSetting.value;
        vm.on('change-'+parent.id, function (setting) {
          tab.visible = setting.value === parent.value;
        });
      }

      function patchChanges() {
        var patchCalls = _(tab.items)
          .map(patch)
          .filter()
          .value()
        ;
        vm.onChangesPatch(patchCalls)



        function patch(item) {
          var formElems = getFormElems(item.id);

          if (!_.some(formElems, '$dirty')) {
            return;
          }

          var formData = {
            value: item.value,
          };

          if (item.type === 'Secret') {
            // Secrets are write-only: an empty field keeps the saved value,
            // the "remove" checkbox clears it.
            if (item.clear) {
              formData.value = '';
            } else if (!item.value) {
              _.invokeMap(formElems, '$setPristine');
              return;
            }
          }

          return vm.patchSetting(item.id, formData)
            .then(setFormToClean);

          function setFormToClean(response) {
            _.invokeMap(formElems, '$setPristine');

            if (item.type === 'Secret') {
              item.is_set = formData.value !== '';
              item.value = '';
              item.clear = false;
            }

            return response;
          }
        }
      }

      function getFormElems(id) {
        return _.filter([
          tab.form[id + '.value'],
          tab.form[id + '.clear'],
        ]);
      }

      function onFieldChanged(item) {
        vm.fire('change-'+item.id, item)
      }
    }
  }
})();
