(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('listFooter', {
      require: {
        list: '^list'
      },
      controller: 'ListFooterCtrl as footer',
      scope: {},
      bindings: {},
      transclude: true,
      replace: true,
      templateUrl: 'app/layout/list/list-footer.html'
    })
    ;
})();
