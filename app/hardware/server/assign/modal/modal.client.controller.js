(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerAssignClientModalCtrl', ServerAssignClientModalCtrl)
    ;

  /**
   * ServerAssignClientModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignClientModalCtrl(Select, servers) {
    var modal = this;

    modal.servers = servers;
    modal.client = Select('client');
    modal.client.selected = (_.find(modal.servers, 'client') || {}).client || null;
    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      return modal.$close(modal.client.selected);
    }
  }
})();
