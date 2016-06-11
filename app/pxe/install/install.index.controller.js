(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .controller('InstallIndexCtrl', InstallIndexCtrl)
    ;

  /**
   * InstallIndex Controller
   *
   * @ngInject
   */
  function InstallIndexCtrl(List) {
    var vm = this;

    vm.list = List('server/*/install');
    vm.list.refreshEvery(10000);

    activate();

    //////////

    function activate() {
      vm.list.load();
    }
  }
})();
