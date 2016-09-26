(function () {
  'use strict';

  angular
    .module('app.system.log.list')
    .component('logTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showUser: '=?',
        showIpAddress: '=?',
        showDescription: '=?',
        showType: '=?',
        showDate: '=?',
      },
      controller: 'LogTableCtrl as table',
      transclude: true,
      templateUrl: 'app/system/log/list/list.table.html'
    })
    .controller('LogTableCtrl', LogTableCtrl)
    ;

  /**
   * @ngInject
   */
  function LogTableCtrl(Url) {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showUser: true,
        showIpAddress: true,
        showDescription: true,
        showType: true,
        showDate: true,
      });

      table.list.list.on('load', function (items) {
        _.map(items, function (row) {
          if (!row.target) {
            return;
          }

          row.target.href = Url.get(row.target.url);
        });
      });
    }
  }
})();
