(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ProfileIndexCtrl', ProfileIndexCtrl);

  /**
   * @ngInject
   */
  function ProfileIndexCtrl(PxeProfileList, ListFilter, $scope, EventEmitter) {
    var vm = this;

    vm.list = PxeProfileList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

    vm.logs = {
      filter: {
        target_type: 'pxe.profile',
      },
    };

    activate();

    ////////////

    function activate() {
      vm.list.on('duplicate_profiles', duplicateProfiles)
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      vm.list
        .create(vm.create.getData())
        .then(fireCreate)
      ;

      function fireCreate() {
        vm.create.fire('create');
      }
    }

    function duplicateProfiles(profiles) {
        vm.create.fire('duplicate_profiles', profiles);
        vm.list.scrollToAnchor('profile-edit-form');
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
