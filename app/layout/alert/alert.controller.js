(function () {
  'use strict';

  angular
    .module('app.layout.alert')
    .controller('AlertController', AlertController);

  /*ngInject*/
  function AlertController(Alert) {
    var alert = this;

    alert.items = Alert.alerts;

    ////////////////

  }
})();
