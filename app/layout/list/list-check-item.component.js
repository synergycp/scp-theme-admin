(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('listCheckItem', {
      bindings: {
        checked: '=',
      },
      require: {
        listCtrl: '^list',
      },
      controller: 'ListCheckItemCtrl as check',
      replace: true,
      templateUrl: 'app/layout/list/list-check-item.html',
    })
    .controller('ListCheckItemCtrl', function() {})
    ;
})();
