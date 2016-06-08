(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('LogListCtrl', LogListCtrl);

  /**
   * @ngInject
   */
  function LogListCtrl(List, $stateParams) {
    var vm = this;

    vm.list = List('log').filter({
    });

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }
  }
})();
