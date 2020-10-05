(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway')
    .component('forwardGatewayHealth', {
      require: {},
      bindings: {
        gateway: '=',
      },
      controller: 'ForwardGatewayHealthCtrl as health',
      templateUrl: 'app/network/forward/gateway/gateway.health.html'
    })
    .controller('ForwardGatewayHealthCtrl', ForwardGatewayHealthCtrl);

  /**
   * @ngInject
   */
  function ForwardGatewayHealthCtrl(Loader, Api, _) {
    var health = this;

    health.loader = Loader();
    health.$onInit = init;
    health.refresh = refresh;
    health.getClassMap = getClassMap;

    //////////

    function init() {
    }

    function getClassMap() {
      return {
        'text-success': health.gateway.status_health === 'OK',
        'text-warning': health.gateway.status_health === 'WARN',
        'text-danger': health.gateway.status_health === 'ERROR',
      };
    }

    function refresh(event) {
      event.stopPropagation();
      return health.loader.during(
        Api.all('forward/gateway')
          .one(health.gateway.id+'')
          .patch({refresh_health: true})
          .then(function (gateway) {
            _.assign(health.gateway, gateway);
          })
      );
    }
  }
})();
