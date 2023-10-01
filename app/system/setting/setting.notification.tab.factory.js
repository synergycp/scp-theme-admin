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
      tab.engines = [];
      tab.getChannels = getChannels;
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
        const requestFunction = `${tab.form.engine.name.toLowerCase()}Request`;
        const request = eval(requestFunction + "()");
        Api.all('notification')
          .post(request)
          .then(function (response) {
            console.log(response);
          })
      }

      function getChannels() {
      }
      function slackRequest() {
        try {
          const recipients = tab.form.slack.channels.split(',').map((channel_code)=>{
            return {
              "channel_code":channel_code
            };
          });
          return {
            "credentials":{
              "token": tab.form.slack.token
            },
            "owner_id": OWNER.id,
            "owner_type": OWNER_TYPE,
            "recipients":recipients,
            "notification_type":tab.form.engine.id,
          };
        } catch (error) {
          console.log(error);
          return null
        }
      }

      // return [
      //   "credentials" => ['token' => 'xoxb-5846175915265-5819196402359-DlqU6ThNUpCoKNaGA85vMDKy'],
      //   "notification_type" => NotificationEngineType::SLACK,
      //   "recipients" => [
      //     ['channel_code' => 'C05Q3095PST']
      //   ],
      //   "owner_type" => get_class($testAdmin),
      //   "owner_id" => $testAdmin->id
      // ];
    }
  }
})();
