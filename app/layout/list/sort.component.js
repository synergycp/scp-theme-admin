(function () {
  'use strict';

  angular
    .module('app.user')
    .component('sort', {
      require: {
        listCtrl: '^list',
      },
      bindings: {
        col: '@',
      },
      controller: 'SortCtrl as sortCtrl',
      templateUrl: 'app/layout/list/sort.html',
    })
    .controller('SortCtrl', SortCtrl)
    ;

  /**
   * @ngInject
   */
  function SortCtrl(EventEmitter) {
    var sortCtrl = this;

    EventEmitter().bindTo(sortCtrl);

    sortCtrl.ASCEND = 'asc';
    sortCtrl.DESCEND = 'desc';

    sortCtrl.$onInit = init;
    sortCtrl.sort = sort;

    //////////

    function init() {
      sortCtrl.query = sortCtrl.listCtrl.list.sortQuery;
    }

    function sort(mode, $event) {
      var list = sortCtrl.listCtrl.list;

      if (shouldClear($event)) {
        list.clearSort();
      }

      list.sort(sortCtrl.col, mode);
      sortCtrl.fire('change', mode);
    }

    function shouldClear($event) {
      return !($event.ctrlKey || $event.shiftKey);
    }
  }
})();
