(function () {
  'use strict';

  angular
    .module('app.system.log.list')
    .controller('LogIndexCtrl', LogIndexCtrl);

  /**
   * @ngInject
   */
  function LogIndexCtrl(List, ListFilter) {
    var vm = this;

    vm.list = List('log').filter({
    });
    vm.filters = ListFilter(vm.list);

    activate();

    ////////////

    function activate() {
    }
  }
})();
