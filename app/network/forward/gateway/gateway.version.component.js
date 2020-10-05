(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway')
    .component('forwardGatewayVersion', {
      require: {},
      bindings: {
        gateway: '=',
      },
      controller: 'ForwardGatewayVersionCtrl as version',
      templateUrl: 'app/network/forward/gateway/gateway.version.html'
    })
    .controller('ForwardGatewayVersionCtrl', ForwardGatewayVersionCtrl);

  /**
   * @ngInject
   */
  function ForwardGatewayVersionCtrl(Loader, Api, _, RouteHelpers, Modal) {
    var version = this;

    version.loader = Loader();
    version.$onInit = init;
    version.refresh = refresh;
    version.updateVersion = updateVersion;

    //////////

    function init() {
    }

    function updateVersion() {
      RouteHelpers.loadLang('forward');
      return Modal
        .make()
        .templateUrl('app/network/forward/gateway/gateway.version.update.modal.html')
        .controller('ForwardGatewayVersionUpdateCtrl as modal')
        .data({
          gateway: version.gateway,
        })
        .open()
        .result;
    }

    function refresh(event) {
      event.stopPropagation();
      return version.loader.during(
        Api.all('forward/gateway')
          .one(version.gateway.id+'')
          .patch({refresh_health: true})
          .then(function (gateway) {
            _.assign(version.gateway, gateway);
          })
      );
    }
  }
})();
