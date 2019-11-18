(function () {
  'use strict';

  angular
    .module('app.system.package')
    .component('packageOverviewCard', {
      require: {},
      bindings: {
        package: '=',
      },
      controller: 'PackageOverviewCardCtrl as overview',
      transclude: true,
      templateUrl: 'app/system/package/package.overview.card.html'
    })
    .controller('PackageOverviewCardCtrl', PackageOverviewCardCtrl);

  /**
   * @ngInject
   */
  function PackageOverviewCardCtrl(PackageList, Loader, $state) {
    var overview = this;

    overview.loader = Loader();
    overview.$onInit = init;
    overview.delete = doDelete;

    //////////

    function init() {}

    function doDelete() {
      return overview.loader.during(
        PackageList()
          .confirm
          .delete([overview.package])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.system.package.list');
    }
  }
})();
