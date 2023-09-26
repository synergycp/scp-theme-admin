(function () {
  'use strict';

  angular
    .module('app.system.setting')
    .factory('NotificationTab', NotificationTab);

  /**
   * NotificationTab Factory
   *
   * @ngInject
   */
  function NotificationTab(Loader, Api) {
    return function(vm) {
      var tab = this;
      var $api = Api.one('notification');

      tab.trans = 'system.setting.notification.TITLE';
      tab.body = 'app/system/setting/setting.notification.html';
      tab.active = false;
      tab.visible = true;
      console.log("NotificationTab");
      tab.engines = [];
      tab.form = {
        submit
      };
      getEngines();
      function getEngines() {
        return Api.one('notification/engine/all')
          .get()
          .then(storeEngines)
        ;
      }

      function storeEngines(response) {
        tab.engines = [];
        if(response.response.code === 200){
          tab.engines = response.response.data;
        }
        console.log(tab.engines);
      }

      function submit() {
        console.log(tab.form);
      }
    }
  }
})();
