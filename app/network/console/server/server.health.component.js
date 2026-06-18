(function () {
  'use strict';

  angular
    .module('app.network.console.server')
    .component('consoleServerHealth', {
      require: {},
      bindings: {
        server: '=',
      },
      controller: 'ConsoleServerHealthCtrl as health',
      templateUrl: 'app/network/console/server/server.health.html'
    })
    .controller('ConsoleServerHealthCtrl', ConsoleServerHealthCtrl);

  /**
   * @ngInject
   */
  function ConsoleServerHealthCtrl(Loader, Api, _) {
    var health = this;

    health.loader = Loader();
    health.$onInit = init;
    health.refresh = refresh;
    health.getClassMap = getClassMap;

    function init() {}

    function getClassMap() {
      return {
        'text-success': health.server.status_health === 'OK',
        'text-warning': health.server.status_health === 'WARN',
        'text-danger': health.server.status_health === 'ERROR',
      };
    }

    function refresh(event) {
      event.stopPropagation();
      return health.loader.during(
        Api.all('console/server')
          .one(health.server.id+'')
          .patch({refresh_health: true})
          .then(function (server) {
            _.assign(health.server, server);
          })
      );
    }
  }
})();
