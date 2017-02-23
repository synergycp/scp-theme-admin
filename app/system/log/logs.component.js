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
  function LogCtrl(List, ListFilter, RouteHelpers, Permission) {
    var logs = this;

    logs.list = null;
    logs.show = show;

    logs.$onInit = init;


    //////////

    function init() {
      _.defaults(logs, {
        showType: true,
        filter: {},
      });

      Permission
        .ifHas('system.logs.read')
        .then(showLogs)
      ;
    }

    function showLogs() {
      logs.list = List('log').filter({
      });
      logs.filters = ListFilter(logs.list);
      logs.filters.current = {};

      RouteHelpers.loadLang('system');

      _.assign(logs.filters.current, logs.filter);

      if (logs.listenTo) {
        logs.listenTo.on('change', logs.list.load);
      }
    }

    function show() {
      return logs.list.items.length ||
          !angular.equals({}, logs.filters.current)
      ;
    }
  }
})();
