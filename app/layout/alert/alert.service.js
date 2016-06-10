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
  function AlertService (_, Message, $rootScope) {
    var Alert = this;

    Alert.alerts = [];
    Alert.success = newMessage.bind(null, "success");
    Alert.warning = newMessage.bind(null, "warning");
    Alert.danger = newMessage.bind(null, "danger");
    Alert.info = newMessage.bind(null, "info");

    Alert.clear = clear;
    Alert.remove = remove;

    //////////

    function newMessage(type, msg, timeout) {
      var message = Message(type, msg);

      message.on('remove', remove);

      if (timeout) {
        message.setTimeout(timeout);
      }

      Alert.alerts.push(message);

      return message;
    }

    function clear() {
      _.setContents(Alert.alerts, []);

      return Alert;
    }

    function remove(alert) {
      $rootScope.$evalAsync(function() {
        _.remove(Alert.alerts, function (compare) {
          return compare.$$hashKey == alert.$$hashKey;
        });
      });

      return Alert;
    }
  }
})();
