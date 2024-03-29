(function () {
  "use strict";

  angular
    .module("app.network.group.search")
    .factory("GroupSearchTab", GroupSearchTabFactory)
    .run(addGroupSearchTab);

  /**
   * Add the GroupSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addGroupSearchTab(Search, GroupSearchTab, Auth, Permission) {
    var tab = GroupSearchTab();
    Auth.whileLoggedIn(checkPerms, removeTab);

    function checkPerms() {
      Permission.ifHas("network.groups.read").then(addTab).else(removeTab);
    }

    function removeTab() {
      Search.tab.remove(tab);
    }

    function addTab() {
      Search.tab.add(tab);
    }
  }
  /**
   * GroupSearchTab Factory
   *
   * @ngInject
   */
  function GroupSearchTabFactory($state, GroupList, ListFilter, RouteHelpers) {
    return function () {
      var list = GroupList();
      return new GroupSearchTab(list, $state, ListFilter(list), RouteHelpers);
    };
  }

  function GroupSearchTab(list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.name = "groups";
    tab.lang = "group";
    tab.text = "group.search.TITLE";
    tab.list = list;
    tab.filter = filter;
    tab.getState = getState;
    tab.getStateParams = getStateParams;
    tab.order = 25;
    tab.results = {
      url: RouteHelpers.basepath("network/group/search/search.tab.html"),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      "network/group/search/search.item.html"
    );

    //////////

    function getState() {
      return "app.network.group.view";
    }

    function getStateParams($item) {
      return {
        id: $item.id,
      };
    }
  }
})();
