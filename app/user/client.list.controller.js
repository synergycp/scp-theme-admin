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
    var withSelected = new WithSelected();

    vm.list = List('client');

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
