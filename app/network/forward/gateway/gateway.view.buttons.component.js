(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway')
    .component('forwardGatewayButtons', {
      require: {},
      bindings: {
        gateway: '=',
      },
      controller: 'ForwardGatewayButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/network/forward/gateway/gateway.view.buttons.html'
    })
    .controller('ForwardGatewayButtonsCtrl', ForwardGatewayButtonsCtrl);

  /**
   * @ngInject
   */
  function ForwardGatewayButtonsCtrl(ForwardGatewayList, Loader, $state, Api) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;
    buttons.resync = resync;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        ForwardGatewayList()
          .confirm
          .delete([buttons.gateway])
          .result.then(transferToList)
      );
    }

    function resync() {
      return buttons.loader.during(
        Api.all('forward/gateway')
          .one(buttons.gateway.id+'')
          .patch({resync: true})
      );
    }

    function transferToList() {
      $state.go('app.network.forward.gateway.list');
    }
  }
})();
