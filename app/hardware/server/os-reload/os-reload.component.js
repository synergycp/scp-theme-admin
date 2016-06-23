(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverOsReload', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerOsReloadCtrl as reload',
      transclude: true,
      templateUrl: 'app/hardware/server/os-reload/os-reload.html'
    })
    .controller('ServerOsReloadCtrl', ServerOsReloadCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerOsReloadCtrl() {
    var reload = this;

    reload.$onInit = init;

    //////////

    function init() {
    }
  }
})();
