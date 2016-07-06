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
  function InstallIndexCtrl(List, $scope) {
    var vm = this;

    vm.list = List('server/*/install');

    activate();

    //////////

    function activate() {
      vm.list.refresh
        .now()
        .every(10000)
        .limitScope($scope)
        ;
    }
  }
})();
