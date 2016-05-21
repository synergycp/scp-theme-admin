(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('listFooter', {
      require: {
        list: '^list'
      },
      transclude: true,
      replace: true,
      templateUrl: 'app/layout/list/list-footer.html'
    });
})();
