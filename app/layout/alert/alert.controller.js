(function () {
  'use strict';

  angular
    .module('app.layout.alert')
    .controller('AlertCtrl', AlertCtrl);

  /*ngInject*/
  function AlertCtrl(Alert) {
    var alert = this;

    alert.items = Alert.alerts;

    ////////////////

  }
})();
