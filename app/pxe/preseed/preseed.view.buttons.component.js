(function () {
  'use strict';

  angular
    .module('app.user.client.view')
    .component('preseedButtons', {
      require: {},
      bindings: {
        preseed: '=',
      },
      controller: 'PreseedButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/preseed/preseed.view.buttons.html'
    })
    .controller('PreseedButtonsCtrl', PreseedButtonsCtrl);

  /**
   * @ngInject
   */
  function PreseedButtonsCtrl(PreseedList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PreseedList()
          .confirm
          .delete([buttons.preseed])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.preseed.list');
    }
  }
})();
