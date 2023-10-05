(function () {
  'use strict';

  var INPUTS = {
    name: '',
    engine: null,
    slack: null,
  };

  angular
    .module('app.system')
    .component('notificationForm', {
      require: {
      },
      bindings: {
        form: '=',
        isCreationMode: '@'
      },
      controller: 'NotificationFormCtrl as notificationForm',
      transclude: true,
      templateUrl: 'app/system/notification/notification.form.html',
    })
    .controller('NotificationFormCtrl', NotificationFormCtrl)
    ;

  /**
   * @ngInject
   */

  function NotificationFormCtrl(Api) {
    var notificationForm = this;
    notificationForm.engines = [];
    const OWNER_TYPE = 'App\\Admin\\Admin';
    var OWNER = null;
    notificationForm.$onInit = init;
    notificationForm.input = _.clone(INPUTS);

    //////////

    function init() {
      const storage = JSON.parse(localStorage.getItem('ngStorage-admin.apiKey'));
      OWNER = storage.owner;
      notificationForm.form.getData = getData;
      fillFormInputs();
      getEngines();
      (notificationForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      const requestFunction = `${notificationForm.input.engine.name.toLowerCase()}Request`;
      // Dynamically called depending on selected engine
      const request = eval(requestFunction + "()");
      return _.clone(request);
    }

    function fillFormInputs() {
      console.log("fillFormInputs");
      console.log(notificationForm)
      _.overwrite(notificationForm.input, notificationForm.form.input);
    }
    function getEngines() {
      return Api.one('notification/engine/all')
        .get()
        .then(storeEngines)
      ;
    }

    function storeEngines(response) {
      notificationForm.engines = [];
      if(response.response.code === 200){
        _.setContents(notificationForm.engines, response);
      }
    }
    function slackRequest() {
      let request = {"owner_id": OWNER.id, "owner_type": OWNER_TYPE};
      try {
        if (notificationForm.input.engine) {
          request['notification_type'] = notificationForm.input.engine.id;
        }
        if(notificationForm.input.slack && notificationForm.input.slack.token){
          request['credentials'] = {
            "token": notificationForm.input.slack.token
          };
        }
        if (notificationForm.input.slack && notificationForm.input.slack.channels) {
          const recipients = notificationForm.input.slack.channels.split(',').map((channel_code)=>{
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
})();
