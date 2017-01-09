(function () {
  'use strict';

  angular
    .module('app.system.log')
    .component('logs', {
      require: {
      },
      bindings: {
        heading: '@',
        filter: '=?',
        listenTo: '=?',
        showType: '=?',
      },
      controller: 'LogCtrl as logs',
      transclude: true,
      templateUrl: templateProvider,
    })
    .controller('LogCtrl', LogCtrl)
    ;

  /**
   * @ngInject
   */
  function templateProvider(RouteHelpers) {
    return RouteHelpers.basepath('system/log/logs.html');
  }

  /**
   * @ngInject
   */
  function LogCtrl(List, ListFilter, RouteHelpers) {
    var logs = this;

    logs.list = List('log').filter({
    });
    logs.filters = ListFilter(logs.list);
    logs.filters.current = logs.filter;

    logs.$onInit = init;

    //////////

    function init() {
      _.defaults(logs, {
        showType: true,
      });

      RouteHelpers.loadLang('system');

      logs.filter = logs.filter || {};

      if (logs.listenTo) {
        logs.listenTo.on('change', logs.list.load);
      }
    }
  }
})();
