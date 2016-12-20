(function () {
  'use strict';

  angular
    .module('app.pxe.shell')
    .component('shellButtons', {
      require: {},
      bindings: {
        shell: '=',
      },
      controller: 'ShellButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/shell/shell.view.buttons.html'
    })
    .controller('ShellButtonsCtrl', ShellButtonsCtrl);

  /**
   * @ngInject
   */
  function ShellButtonsCtrl(PxeShellList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PxeShellList()
          .confirm
          .delete([buttons.shell])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.shell.list');
    }
  }
})();
