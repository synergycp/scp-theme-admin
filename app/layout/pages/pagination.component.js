(function () {
  'use strict';

  angular
    .module('app.layout.pages')
    .component('pagination', {
      controller: 'PaginationCtrl as pagination',
      scope: {},
      bindings: {
        pages: '=',
      },
      transclude: true,
      replace: true,
      templateUrl: 'app/layout/pages/pagination.html',
    })
    ;
})();
