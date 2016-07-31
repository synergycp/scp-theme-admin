(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .service('ServerAssign', ServerAssignService);

  /**
   * ServerAssign Service
   *
   * @ngInject
   */
  function ServerAssignService ($q) {
    var ServerAssign = this;

    ServerAssign.unsuspend = unsuspend;

    //////////

    function unsuspend(servers) {
      return $q.all(
        _.map(servers, setActive.bind(null, true))
      );
    }

    function setActive(active, server) {
      var access = server.access;

      if (!access) {
        return;
      }

      var data = {
        is_active: active,
      };

      return server.one('access/'+access.id)
        .patch(data)
        .then(saveResponse)
        ;

      function saveResponse(response) {
        _.assign(access, response);
      }
    }
  }
})();
