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
  function ServerAssignClientModalCtrl(Select, servers, access) {
    var modal = this;

    modal.access = _.assign({
      client: null,
      pxe: true,
      ipmi: true,
      switch: true,
    }, access || {});

    modal.servers = servers;
    modal.client = Select('client');
    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      return modal.$close(!modal.access.client ? null : {
        client: {
          id: modal.access.client.id,
        },
        pxe: modal.access.pxe,
        ipmi: modal.access.ipmi,
        switch: modal.access.switch,
      });
    }
  }
})();
