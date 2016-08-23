(function () {
  'use strict';

  angular
    .module('app.hardware.server.buttons')
    .component('serverButtons', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/hardware/server/buttons/buttons.html'
    })
    ;
})();
