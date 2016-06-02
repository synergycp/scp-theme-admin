(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('withSelected', {
      require: {
      },
      bindings: {
        options: '=',
        onSubmit: '&',
      },
      controller: 'WithSelectedCtrl as bulk',
      transclude: true,
      templateUrl: 'app/layout/list/with-selected.html'
    });
})();
