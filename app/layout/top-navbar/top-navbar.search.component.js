(function () {
  'use strict';

  angular
    .module('app.layout')
    .component('topNavSearch', {
      require: {
      },
      bindings: {
      },
      controller: 'TopNavSearchCtrl as search',
      templateUrl: 'app/layout/top-navbar/top-navbar.search.html',
    })
    ;
})();
