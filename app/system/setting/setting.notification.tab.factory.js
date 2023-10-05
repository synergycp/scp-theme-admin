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
  const OWNER_TYPE = 'App\\Admin\\Admin';
  var OWNER = null;
  function NotificationTab(Loader, Api) {
    return function(vm) {
      const storage = JSON.parse(localStorage.getItem('ngStorage-admin.apiKey'));
      OWNER = storage.owner;
      var tab = this;
      var $api = Api.one('notification');

      tab.trans = 'system.setting.notification.TITLE';
      tab.body = 'app/system/setting/setting.notification.html';
      tab.active = false;
      tab.visible = true;

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
         vm.list = response.response.data;
        }
        console.log(tab.engines);
      }

      function submit() {
        const requestFunction = `${tab.form.engine.name.toLowerCase()}Request`;
        const request = eval(requestFunction + "()");
        Api.all('notification')
          .post(request)
          .then(function (response) {
            console.log(response);
          })
      }
      function slackRequest() {
        let request = {"owner_id": OWNER.id, "owner_type": OWNER_TYPE};
        try {
          if (tab.form.engine) {
            request['notification_type'] = tab.form.engine.id;
          }
          if(tab.form.slack && tab.form.slack.token){
            request['credentials'] = {
              "token": tab.form.slack.token
            };
          }
          if (tab.form.slack && tab.form.slack.channels) {
            const recipients = tab.form.slack.channels.split(',').map((channel_code)=>{
              return {
                "channel_code":channel_code
              };
            });
            request['recipients'] = recipients;
          }
        } catch (error) {
          console.log(error.message);
        }finally{
          return request;
        }
      }
    }
  }
})();
