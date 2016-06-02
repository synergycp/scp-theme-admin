(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('AdminListCtrl', AdminListCtrl);

  /*@ngInject*/
  function AdminListCtrl(List) {
    var vm = this;

    vm.list = List('admin');
    vm.list.bulk.add('Delete', vm.list.delete);

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }
  }
})();
