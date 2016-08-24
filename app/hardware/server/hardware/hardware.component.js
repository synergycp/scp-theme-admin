(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverHardware', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerHardwareCtrl as hardware',
      transclude: true,
      templateUrl: 'app/hardware/server/hardware/hardware.html'
    })
    .controller('ServerHardwareCtrl', ServerHardwareCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerHardwareCtrl() {
    var hardware = this;

    hardware.$onInit = init;
    hardware.items = [];

    //////////

    function init() {
      syncParts();
    }

    function syncParts() {
      _.setContents(hardware.items, _.flatten([
        _.enhance([hardware.server.cpu], trans('CPU')),
        _.enhance([hardware.server.mem], trans('MEM')),
        _.enhance(hardware.server.disks, trans('DISK')),
        _.enhance(hardware.server.addons, trans('ADD-ON')),
      ]));

      function trans(type) {
        return {
          trans: 'server.hardware.'+type,
        };
      }
    }
  }
})();
