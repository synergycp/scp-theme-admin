(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerAssignDeleteModalCtrl', ServerAssignDeleteModalCtrl)
    ;

  /**
   * ServerAssignDeleteModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignDeleteModalCtrl(servers) {
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
