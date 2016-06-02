(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ShellListCtrl', ShellListCtrl);

  /**
   * @ngInject
   */
  function ShellListCtrl(List) {
    var vm = this;

    vm.list = List('pxe/shell');
    vm.list.bulk.add('Delete', vm.list.delete);

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }
  }
})();
