(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .component('listHeader', {
      require: {
      },
      bindings: {
        text: '@',
      },
      controller: 'ListHeaderCtrl as listHeader',
      transclude: true,
      templateUrl: 'app/layout/list/list.header.html'
    })
    .controller('ListHeaderCtrl', ListHeaderCtrl)
    ;

  /**
   * @ngInject
   */
  function ListHeaderCtrl() {
    var listHeader = this;

    listHeader.$onInit = init;

    //////////

    function init() {
    }
  }
})();
