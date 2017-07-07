(function () {
  'use strict';

  angular
    .module('app.system.log.list')
    .controller('LogIndexCtrl', LogIndexCtrl);

  /**
   * @ngInject
   */
  function LogIndexCtrl(List, ListFilter, $state) {
    var vm = this;

    vm.list = List('log').filter({
    });
    vm.filters = ListFilter(vm.list);
    vm.filters.current.q = $state.params.q;
    vm.filters.on('change', function () {
      $state.go($state.current.name, vm.filters.current, {location: 'replace'});
    });

    activate();

    ////////////

    function activate() {
    }
  }
})();
