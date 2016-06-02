(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PreseedListCtrl', PreseedListCtrl);

  /**
   * @ngInject
   */
  function PreseedListCtrl(List) {
    var vm = this;

    vm.list = List('pxe/preseed');
    vm.list.bulk.add('Delete', vm.list.delete);

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }
  }
})();
