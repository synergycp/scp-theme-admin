(function () {
  'use strict';

  angular
    .module('app.user')
    .component('sort', {
      require: {
        list: '^list',
      },
      bindings: {
        col: '@',
        mode: '=',
      },
      controller: 'SortCtrl as sortCtrl',
      templateUrl: 'app/layout/list/sort.html'
    })
    .controller('SortCtrl', SortCtrl)
    ;

  function SortCtrl(EventEmitter) {
    var sortCtrl = this;

    EventEmitter().bindTo(sortCtrl);

    sortCtrl.$onInit = init;
    sortCtrl.asc = asc;
    sortCtrl.desc = desc;
    sortCtrl.ASCEND = 'asc';
    sortCtrl.DESCEND = 'desc';
    sortCtrl.on('change', function (mode) {
      sortCtrl.list.sort(sortCtrl.col, mode);
    });

    //////////

    function init() {
    }

    function asc() {
      sortCtrl.mode = sortCtrl.ASCEND;
      sortCtrl.fire('change', sortCtrl.mode);
    }

    function desc() {
      sortCtrl.mode = sortCtrl.DESCEND;
      sortCtrl.fire('change', sortCtrl.mode);
    }
  }
})();
