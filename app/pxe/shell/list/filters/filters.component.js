(function () {
  'use strict';

  angular
    .module('app.pxe.shell.list.filters')
    .component('shellFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'ShellFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/shell/list/filters/filters.html'
    })
    ;
})();
