(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('listCheckAll', {
      bindings: {
      },
      require: {
        listCtrl: '^list',
      },
      controller: 'ListCheckAllCtrl as checkAll',
      replace: true,
      templateUrl: 'app/layout/list/list-check-all.html',
    })
    .controller('ListCheckAllCtrl', function() {})
    ;
})();
