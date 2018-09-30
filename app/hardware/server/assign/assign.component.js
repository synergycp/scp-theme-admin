(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverAssign', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerAssignCtrl as assign',
      transclude: true,
      templateUrl: 'app/hardware/server/assign/assign.html'
    })
    .controller('ServerAssignCtrl', ServerAssignCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerAssignCtrl(Api, ServerAssignModal, _) {
    var assign = this;
    var debouncedLoad = _.debounce(syncEntities, 15);

    assign.$onInit = init;
    assign.entities = {
      items: [],
      load: debouncedLoad,
    };
    assign.client = {
      modal: assignClientModal,
    };
    assign.saveNickname = saveNickname;
    assign.saveServerId = saveServerId;

    //////////

    function saveNickname() {
      return assign.server.patch({
        nickname: assign.server.nickname,
      });
    }

    function saveServerId() {
      return assign.server.patch({
        srv_id: assign.server.srv_id,
      });
    }

    function init() {
      assign.server.on('change', debouncedLoad);
      debouncedLoad();
    }

    function syncEntities() {
      return Api
        .all('entity')
        .getList({
          server: assign.server.id,
        })
        .then(storeEntities)
        ;
    }

    function storeEntities(entities) {
      _.setContents(assign.entities.items, entities);
    }

    /**
     * @return {Promise} Selected Client
     */
    function assignClientModal() {
      return ServerAssignModal.client([assign.server], assign.server.access);
    }
  }
})();
