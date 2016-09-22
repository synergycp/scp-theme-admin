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
  function InstallIndexCtrl(OsReloadList, $scope) {
    var vm = this;

    vm.list = OsReloadList().limitScope($scope);

    activate();

    //////////

    function activate() {
    }
  }
})();
