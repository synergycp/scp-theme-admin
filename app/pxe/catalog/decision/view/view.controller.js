(function () {
  'use strict';

  angular
    .module('app.pxe.catalog.decision.view')
    .controller('CatalogDecisionViewCtrl', CatalogDecisionViewCtrl);

  /**
   * @ngInject
   */
  function CatalogDecisionViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/catalog/decision/' + $stateParams.id);

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }
  }
})();
