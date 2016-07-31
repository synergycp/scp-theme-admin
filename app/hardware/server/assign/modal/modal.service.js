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
  function ServerAssignModalService ($uibModal, $q, Api) {
    var ServerAssignModal = this;
    var $api = Api.all('server');

    ServerAssignModal.wipe = wipe;
    ServerAssignModal.client = client;
    ServerAssignModal.delete = remove;
    ServerAssignModal.suspend = suspend;

    //////////

    function remove(servers) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/modal/modal.delete.html',
        controller: 'ServerAssignDeleteModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          servers: function () {
            return servers;
          },
        },
      });

      return modal.result
        .then($bulk(servers).remove);
    }

    function wipe(servers) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/modal/modal.wipe.html',
        controller: 'ServerAssignWipeModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          servers: function () {
            return servers;
          },
        },
      });

      return modal.result
        .then($bulk(servers).patch.bind(null, { wiped: true }))
        ;
    }

    function suspend(servers) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/modal/modal.suspend.html',
        controller: 'ServerAssignSuspendModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          servers: function () {
            return servers;
          },
        },
      });

      return modal.result.then(patchServerAccesses);

      function patchServerAccesses() {
        return $q.all(
          _.map(servers, patchAccess)
        );

        function patchAccess(server) {
          if (!server.access) {
            return;
          }

          var $access = server
            .all('access')
            .one(''+server.access.id);

          return $access.patch({ is_active: false })
            .then(saveAccessResponse.bind(null, server));
        }
      }
    }

    /**
     * Updates items' clients in-place after.
     *
     * @return {Promise} Selected Client
     */
    function client(servers, access) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/server/assign/modal/modal.client.html',
        controller: 'ServerAssignClientModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          servers: function () {
            return servers;
          },
          access: function () {
            return typeof access !== "undefined" ?
              access :
              _.find(servers, 'access').access;
          },
        },
      });

      return modal.result.then(function (access) {
        var accessData = !access ? null : {
          client: {
            id: access.client.id,
          },
          pxe: access.pxe,
          ipmi: access.ipmi,
          switch: access.switch,
        };

        return $q.all(
          _.map(servers, patchAccess)
        );

        function patchAccess(server) {
          if (server.access) {
            var $access = server
              .all('access')
              .one(''+server.access.id);

            if (access && server.access.client.id == access.client.id) {
              return $access.patch(accessData)
                .then(saveAccessResponse.bind(null, server));
            }

            return $access
              .remove()
              .then(create.bind(null, server));
          }

          return create(server);
        }

        function create(server) {
          if (!access) {
            server.access = null;

            return $q.when(null);
          }

          return server
            .all('access')
            .post(accessData)
            .then(saveAccessResponse.bind(null, server))
            ;
        }
      });
    }

    function saveAccessResponse(server, response) {
      if (!response.id) {
        server.access = null;

        return response;
      }

      server.access = server.access || response;
      _.assign(server.access, response);

      return response;
    }

    function $bulk(servers) {
      var serverIds = _.map(servers, 'id').join(',');

      return $api.one(serverIds);
    }
  }
})();
