(function () {
  'use strict';

  angular
    .module('app.pxe.boot')
    .component('bootButtons', {
      require: {},
      bindings: {
        boot: '=',
      },
      controller: 'BootButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/boot/boot.view.buttons.html'
    })
    .controller('BootButtonsCtrl', BootButtonsCtrl);

  /**
   * @ngInject
   */
  function BootButtonsCtrl(PxeBootList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PxeBootList()
          .confirm
          .delete([buttons.boot])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.boot.list');
    }
  }
})();
