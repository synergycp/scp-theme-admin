(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .component('installProgress', {
      require: {
      },
      bindings: {
        install: '=',
        onDelete: '&'
      },
      controller: 'InstallProgressCtrl as progress',
      transclude: true,
      templateUrl: 'app/pxe/install/progress/progress.html'
    })
    .controller('InstallProgressCtrl', InstallProgressCtrl)
    ;

  /**
   * @ngInject
   */
  function InstallProgressCtrl($uibModal) {
    var progress = this;

    progress.$onInit = init;

    progress.delete = showDeleteModal;

    //////////

    function init() {
    }

    function showDeleteModal() {
      var modal = $uibModal.open({
        templateUrl: 'app/pxe/install/progress/modal/modal.delete.html',
        controller: function() {},
        bindToController: true,
        controllerAs: 'modal'
      });

      return modal.result.then(function () {
        progress.onDelete(progress);
      });
    }
  }
})();
