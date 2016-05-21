(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('listHeading', {
      require: {
        list: '^list'
      },
      transclude: true,
      templateUrl: 'app/layout/list/list-heading.html'
    });
})();
