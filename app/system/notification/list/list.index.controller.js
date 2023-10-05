(function () {
  'use strict';

  angular
    .module('app.system.notification.list')
    .controller('NotificationIndexCtrl', NotificationIndexCtrl);

  /**
   * @ngInject
   */
  function NotificationIndexCtrl(NotificationList, ListFilter, $scope) {
    var vm = this;
    vm.list = NotificationList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'email-template',
      },
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
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
