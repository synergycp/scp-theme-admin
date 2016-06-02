(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('ClientListCtrl', ClientListCtrl);

  /**
   * @ngInject
   */
  function ClientListCtrl(List) {
    var vm = this;

    vm.list = List('client');

    var bulk = vm.list.bulk;
    bulk.add('Delete', vm.list.delete);

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }
  }
})();
