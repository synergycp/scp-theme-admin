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
        target_type: 'notification',
      },
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      const data = vm.create.getData();
      if(!data)return;


      vm.list.create(data);
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
