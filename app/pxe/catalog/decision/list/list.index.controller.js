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

    activate();

    ///////////

    function activate() {
      vm.list.refresh.now();
      $scope.$on('$destroy', onDestroy);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
