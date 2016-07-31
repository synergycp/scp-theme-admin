(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerAssignSuspendModalCtrl', ServerAssignSuspendModalCtrl)
    ;

  /**
   * ServerAssignSuspendModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignSuspendModalCtrl(servers) {
    var modal = this;

    modal.servers = servers;

    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      return modal.$close();
    }
  }
})();
