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

  function NotificationFormCtrl(Api, Alert, Select) {
    var notificationForm = this;
    notificationForm.engines = [];
    notificationForm.notificableEvents = Select('notificable-event?showall=true').multi();;
    const OWNER_TYPE = 'App\\Admin\\Admin';
    var OWNER = null;
    notificationForm.$onInit = init;
    notificationForm.input = _.clone(INPUTS);

    //////////

    function init() {
      const storage = JSON.parse(localStorage.getItem('ngStorage-admin.apiKey'));
      OWNER = storage.owner;
      notificationForm.form.getData = getData;
      getEngines();
      fillFormInputs();
      (notificationForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      if (!notificationForm.input.engine) {
        Alert.warning('Select a notification engine');
        return false;
      }
      const requestFunction = `${notificationForm.input.engine.name.toLowerCase()}Request`;
      // Dynamically called depending on selected engine
      const request = eval(requestFunction + "()");
      return _.clone(request);
    }

    function fillFormInputs() {
      if(!notificationForm.form.input.engine)return;  
      notificationForm = formPreparation(notificationForm);
      _.overwrite(notificationForm.input, notificationForm.form.input);
      const selectedEvents = Array.isArray(notificationForm.form.input.events)?notificationForm.form.input.events:[];
      notificationForm.notificableEvents.selected = selectedEvents;
    }
    function formPreparation(notificationForm) {
      if (notificationForm.form.input.engine.id == 1) {
        return slackFormPreparation(notificationForm);
      }
      if (notificationForm.form.input.engine.id == 2) {
        return emailFormPreparation(notificationForm);
      }
      return notificationForm; 
    }
    function slackFormPreparation(notificationForm) {
      let slackJson = {};
      if (notificationForm.form.input.credentials) {
        slackJson['token'] = notificationForm.form.input.credentials.token;
      }
      if (notificationForm.form.input.recipients) {
        slackJson['channels'] = notificationForm.form.input.recipients.map(function ($channel) {
          return $channel['channel_code'];
        }).join(',');
      }
      notificationForm.input.slack = slackJson;
      return notificationForm;      
    }
    function emailFormPreparation(notificationForm) {
      let jsonForm = {};
      if (notificationForm.form.input.recipients) {
        jsonForm['emails'] = notificationForm.form.input.recipients.map(function ($channel) {
          return $channel['email'];
        }).join(',');
      }
      notificationForm.input.email = jsonForm;
      return notificationForm;
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
        fillFormInputs();
      }
    }
    function slackRequest() {
      let request = baseRequest();
      try {
        if (notificationForm.input.engine) {
          request['notificationRq']['notification_type'] = notificationForm.input.engine.id;
        }
        if(notificationForm.input.slack && notificationForm.input.slack.token){
          request['notificationRq']['credentials'] = {
            "token": notificationForm.input.slack.token
          };
        }
        if (notificationForm.input.slack && notificationForm.input.slack.channels) {
          const recipients = notificationForm.input.slack.channels.split(',').map((channel_code)=>{
            return {
              "channel_code":channel_code
            };
          });
          request['notificationRq']['recipients'] = recipients;
        }
      } catch (error) {
        console.log(error.message);
      }finally{
        return request;
      }
    }
    function baseRequest(){
      const event_ids = notificationForm.notificableEvents.selected.map(function (item) {
        return item.id;
      });
      
      return {
              notificationRq:{
                              name:notificationForm.input.name,
                              "owner_id": OWNER.id, 
                              "owner_type": OWNER_TYPE
                            }, 
              eventsRq:{event_ids: event_ids}
              };
    }
    function emailRequest() {
      let request = baseRequest();
      try {
        if (notificationForm.input.engine) {
          request['notificationRq']['notification_type'] = notificationForm.input.engine.id;
        }
        if(notificationForm.input.email && notificationForm.input.email.emails){
          request['notificationRq']['recipients'] = notificationForm.input.email.emails.split(',')
          .map((email)=>{
                      return {
                        "email":email
                      };
          });
        }
      } catch (error) {
        console.error(error);
      }finally{
        return request;
      }
    }

  }
})();
