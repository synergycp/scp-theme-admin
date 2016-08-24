(function () {
  'use strict';

  angular
    .module('app.hardware.server.buttons')
    .component('serverButtons', {
      require: {
      },
      bindings: {
        server: '=',
        showEdit: '=?',
        showManage: '=?',
      },
      controller: 'ServerButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/hardware/server/buttons/buttons.html'
    })
    ;
})();
