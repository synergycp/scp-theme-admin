(function () {
  'use strict';

  var MODE = {
    ADD: 0,
    SEARCH: 1,
  };

  angular
    .module('app.hardware.server')
    .controller('ServerAssignClientModalCtrl', ServerAssignClientModalCtrl)
    ;

  /**
   * ServerAssignClientModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignClientModalCtrl(
    Select,
    $translateModuleLoader,
    $translate,
    Api,
    EventEmitter,
    _,
    servers,
    access
  ) {
    var modal = this;
    var $client = Api.all('client');

    modal.access = _.assign({
      client: null,
      pxe: true,
      ipmi: true,
      switch: true,
    }, access || {});

    modal.servers = servers;
    modal.client = Select('client');
    modal.submit = submit;
    modal.mode = _.assign({
      value: MODE.SEARCH,
    }, MODE);
    modal.create = {};
    EventEmitter().bindTo(modal.create);

    activate();

    //////////

    function activate() {
      $translateModuleLoader.addPart('client');
      $translate.refresh();
    }

    function submit() {
      switch(modal.mode.value) {
      case MODE.ADD:
        return createClient()
          .catch(function (response) {
            if ((response.data.data || {}).id) {
              return response.data.data;
            }
          })
          .then(function (client) {
            if (!client) {
              throw new Error('Failed to create client');
            }

            modal.access.client = client;
            modal.create.fire('created', client);

            return client;
          })
          .then(sendResult)
          ;
      case MODE.SEARCH:
        return sendResult();
      }
    }

    function createClient() {
      return $client
        .post(modal.create.getData())
        ;
    }

    function sendResult() {
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
