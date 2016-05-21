(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('list', {
      transclude: true,
      templateUrl: 'app/layout/list/list.html',
      controller: 'ListController as list',
    });
})();
