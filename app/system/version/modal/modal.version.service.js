(function () {
  'use strict';

  angular
    .module('app.system.version')
    .service('SystemVersionModalService', makeSystemVersionModal);

  /**
   * @ngInject
   * @return {{}}
   */
  function makeSystemVersionModal(Modal, RouteHelpers) {
    var SystemVersionModal = {};
    SystemVersionModal.update = function () {
      RouteHelpers.loadLang('version');
      return Modal
        .make()
        .templateUrl('app/system/version/modal/modal.version.update.html')
        .controller('SystemVersionModalUpdateCtrl as modal')
        .open()
        .result;
    };
    return SystemVersionModal;
  }
})();
