(function () {
  'use strict';

  angular
    .module('app.layout')
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

    function newMessage(msg, type) {
      var message = new Message(msg, type);

      Alert.alerts.push(alert);

      return alert;
    }

    function Message(text, type) {
      this.msg = text;
      this.type = type || 'info';
    }
  }
})();
