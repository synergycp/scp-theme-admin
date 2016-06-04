(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('list', {
      transclude: true,
      bindings: {
        list: '=',
      },
      scope: {},
      templateUrl: 'app/layout/list/list.html',
      controller: 'ListCtrl as listCtrl',
    });
})();
