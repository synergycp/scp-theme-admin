(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerAssignWipeModalCtrl', ServerAssignWipeModalCtrl)
    ;

  /**
   * ServerAssignWipeModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignWipeModalCtrl(servers) {
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
