(function () {
  'use strict';

  angular
    .module('app.pxe.driver')
    .component('pxeDriverButtons', {
      require: {},
      bindings: {
        driver: '=',
      },
      controller: 'PxeDriverButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/driver/view/driver.view.buttons.html'
    })
    .controller('PxeDriverButtonsCtrl', PxeDriverButtonsCtrl);

  /**
   * @ngInject
   */
  function PxeDriverButtonsCtrl(PxeProfileList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PxeDriverList()
          .confirm
          .delete([buttons.driver])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.driver.list');
    }
  }
})();
