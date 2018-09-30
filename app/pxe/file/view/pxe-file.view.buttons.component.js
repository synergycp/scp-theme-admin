(function () {
  'use strict';

  angular
    .module('app.pxe.file')
    .component('pxeFileButtons', {
      require: {},
      bindings: {
        pxeFile: '=',
      },
      controller: 'PxeFileButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/file/view/pxe-file.view.buttons.html'
    })
    .controller('PxeFileButtonsCtrl', PxeFileButtonsCtrl);

  /**
   * @ngInject
   */
  function PxeFileButtonsCtrl(PxeFileList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;
    buttons.syncChildren = syncChildren;


    //////////

    function init() {

    }

    function syncChildren() {
      return buttons.loader.during(
        buttons.pxeFile.one('child/sync').post()
      );
    }

    function doDelete() {
      return buttons.loader.during(
        PxeFileList()
          .confirm
          .delete([buttons.pxeFile])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.file.list');
    }
  }
})();
