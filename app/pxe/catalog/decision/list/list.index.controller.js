(function () {
  'use strict';

  angular
    .module('app.pxe.catalog.decision.list')
    .controller('CatalogDecisionIndexCtrl', CatalogDecisionIndexCtrl);

  /**
   * @ngInject
   */
  function CatalogDecisionIndexCtrl(CatalogDecisionList, $scope) {
    var vm = this;

    vm.list = CatalogDecisionList()
      .setPaginationAndSortToUrl();

    vm.updating = false;
    vm.updateCatalog = updateCatalog;

    activate();

    ///////////

    function updateCatalog() {
      vm.updating = true;
      return vm.list.updateCatalog()
        .finally(function () {
          vm.updating = false;
        });
    }

    function activate() {
      vm.list.refresh.now();
      $scope.$on('$destroy', onDestroy);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
