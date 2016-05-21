(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardSwitchesCtrl', DashboardSwitchesCtrl)
    ;

  /**
   * DashboardSwitches Controller
   *
   * @ngInject
   */
  function DashboardSwitchesCtrl(Api) {
    var vm = this;
    var $api = Api.all('switch');

    vm.items = [];

    activate();

    ///////////

    function activate() {
      refreshHomeSwitches();
    }

    function refreshHomeSwitches() {
      $api.getList()
        .then(storeHomeSwitches, ignoreErrors)
        ;
    }

    function storeHomeSwitches(homeSwitches) {
      vm.items = homeSwitches;
    }

    function ignoreErrors() {
      return false;
    }
  }
})();
