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

          return vm.patchSetting(item.id, formData)
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

      function onFieldChanged(item) {
        vm.fire('change-'+item.id, item)
      }
    }
  }
})();
