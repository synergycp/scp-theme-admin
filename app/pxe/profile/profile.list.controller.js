(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ProfileListCtrl', ProfileListCtrl);

  /**
   * @ngInject
   */
  function ProfileListCtrl(List) {
    var vm = this;

    vm.list = List('pxe/profile');
    vm.list.bulk.add('Delete', vm.list.delete);

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }
  }
})();
