(function () {
  'use strict';

  angular
    .module('app.layout.alert')
    .service('Alert', AlertService);

  /**
   * Alert Service
   *
   * @ngInject
   */
  function AlertService () {
    var Alert = this;

    Alert.alerts = [];
    Alert.success = newMessage.bind(null, "success");
    Alert.warning = newMessage.bind(null, "warning");
    Alert.danger = newMessage.bind(null, "danger");
    Alert.info = newMessage.bind(null, "info");

    //////////

    function newMessage(type, msg) {
      var message = new Message(msg, type);

      Alert.alerts.push(message);

      return message;
    }

    function Message(text, type) {
      this.text = text;
      this.type = type || 'info';
    }
  }
})();
