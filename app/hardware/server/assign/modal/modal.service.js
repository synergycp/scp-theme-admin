(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .service('ServerAssignModal', ServerAssignModalService);

  /**
   * ServerAssignModal Service
   *
   * @ngInject
   */
  function ServerAssignModalService ($uibModal, Api) {
    var ServerAssignModal = this;
    var $api = Api.all('server');

    ServerAssignModal.client = client;

    //////////

    /**
     * Updates items' clients in-place after.
     *
     * @return {Promise} Selected Client
     */
    function client(servers) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/modal/modal.client.html',
        controller: 'ServerAssignClientModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          servers: function () {
            return servers;
          },
        },
      });

      return modal.result.then(function (client) {
        return $api.one(_.map(servers, 'id').join(',')).patch({
          client: client ? {
            id: client.id
          } : null,
        }).then(function (response) {
          _.each(servers, function (server) {
            if (!response.client) {
              server.client = null;
              return;
            }

            server.client = server.client || response.client;
            _.assign(server.client, response.client);
          });

          return response.client;
        });
      });
    }
  }
})();
