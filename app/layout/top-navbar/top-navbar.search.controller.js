(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('TopNavSearchCtrl', TopNavSearchCtrl)
    ;

  /**
   * @ngInject
   */
  function TopNavSearchCtrl(_, Search) {
    var search = this;

    search.query = Search.query;
    search.changed = changed;
    search.$onInit = init;

    //////////

    function init() {
    }

    function changed() {
      Search.go(search.query);
    }
  }
})();
