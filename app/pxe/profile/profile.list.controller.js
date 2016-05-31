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
    var withSelected = new WithSelected();

    vm.list = List('pxe/profile');

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
