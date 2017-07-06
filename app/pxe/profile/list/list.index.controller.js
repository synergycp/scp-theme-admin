(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ProfileIndexCtrl', ProfileIndexCtrl);

  /**
   * @ngInject
   */
  function ProfileIndexCtrl(PxeProfileList, ListFilter, $scope) {
    var vm = this;

    vm.list = PxeProfileList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.profile',
      },
    };

    activate();

    ////////////

    function activate() {
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      vm.list.create(vm.create.getData());
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
