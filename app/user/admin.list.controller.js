(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('AdminListCtrl', AdminListCtrl);

  /*@ngInject*/
  function AdminListCtrl(List) {
    var vm = this;
    var withSelected = new WithSelected();

    vm.list = List('admin');

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }

    function WithSelected() {
      var withSelected = this;
      withSelected.delete = function () {

      };
    }
  }
})();
