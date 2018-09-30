(function () {
  'use strict';

  angular
    .module('app.pxe.dhcp')
    .component('pxeDhcpButtons', {
      require: {},
      bindings: {
        pxeDhcp: '=',
      },
      controller: 'PxeDhcpButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/dhcp/view/pxe-dhcp.view.buttons.html'
    })
    .controller('PxeDhcpButtonsCtrl', PxeDhcpButtonsCtrl);

  /**
   * @ngInject
   */
  function PxeDhcpButtonsCtrl(PxeDhcpList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PxeDhcpList()
          .confirm
          .delete([buttons.pxeDhcp])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.dhcp.list');
    }
  }
})();
