(function () {
  'use strict';

  angular
    .module('app.pxe.server')
    .component('pxeServerButtons', {
      require: {},
      bindings: {
        pxeServer: '=',
      },
      controller: 'PxeServerButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/server/view/pxe-server.view.buttons.html'
    })
    .controller('PxeServerButtonsCtrl', PxeServerButtonsCtrl);

  /**
   * @ngInject
   */
  function PxeServerButtonsCtrl(PxeServerList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PxeServerList()
          .confirm
          .delete([buttons.pxeServer])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.server.list');
    }
  }
})();
