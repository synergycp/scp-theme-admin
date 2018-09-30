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
        showIpAddress: false,
        showDescription: true,
        showType: true,
        showDate: true,
      });
    }
  }
})();
