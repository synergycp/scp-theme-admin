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
    var withSelected = new WithSelected();

    vm.list = List('pxe/shell');

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
