(function () {
  'use strict';

  angular
    .module('app.pxe.iso')
    .component('isoButtons', {
      require: {},
      bindings: {
        iso: '=',
      },
      controller: 'IsoButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/iso/iso.view.buttons.html'
    })
    .controller('IsoButtonsCtrl', IsoButtonsCtrl);

  /**
   * @ngInject
   */
  function IsoButtonsCtrl(IsoList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        IsoList()
          .confirm
          .delete([buttons.iso])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.iso.list');
    }
  }
})();
