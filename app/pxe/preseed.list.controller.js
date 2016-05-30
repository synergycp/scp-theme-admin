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
    var withSelected = new WithSelected();

    vm.list = List('preseed');

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
