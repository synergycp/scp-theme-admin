(function () {
  'use strict';

  var DIR = 'network/group/dashboard/';

  angular
    .module('app.network.group.dashboard')
    .factory('GroupDashboardPanel', GroupDashboardPanelFactory);

  /**
   * GroupDashboardPanel Factory
   *
   * @ngInject
   */
  function GroupDashboardPanelFactory(
    RouteHelpers,
    EventEmitter,
    GroupList,
    ListFilter
  ) {
    return function () {
      return new GroupDashboardPanel(
        RouteHelpers,
        EventEmitter,
        GroupList,
        ListFilter
      );
    };
  }

  function GroupDashboardPanel(
    RouteHelpers,
    EventEmitter,
    GroupList,
    ListFilter
  ) {
    var panel = this;
    const list = GroupList();
    //list.bulk = [];
    panel.templateUrl = RouteHelpers.basepath(DIR + 'dashboard.panel.html');
    panel.context = {
      list: list,
      filters: ListFilter(list),
    };
    EventEmitter().bindTo(panel);

    RouteHelpers.loadLang('group');
  }
})();
