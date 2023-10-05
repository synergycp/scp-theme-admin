(function () {
  'use strict';

  angular
    .module('app.system.notification.list.filters')
    .component('notificationFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'NotificationFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/system/notification/list/filters/filters.html'
    })
    ;
})();
