(function () {
  "use strict";

  angular
    .module("app.network.switch.search")
    .factory("SwitchSearchTab", SwitchSearchTabFactory)
    .run(addSwitchSearchTab);

  /**
   * Add the SwitchSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addSwitchSearchTab(Search, SwitchSearchTab, Auth, Permission) {
    var tab = SwitchSearchTab();
    Auth.whileLoggedIn(checkPerms, removeTab);

    function checkPerms() {
      Permission.ifHas("network.switches.read").then(addTab).else(removeTab);
    }

    function removeTab() {
      Search.tab.remove(tab);
    }

    function addTab() {
      Search.tab.add(tab);
    }
  }

  /**
   * SwitchSearchTab Factory
   *
   * @ngInject
   */
  function SwitchSearchTabFactory(
    $state,
    SwitchList,
    ListFilter,
    RouteHelpers
  ) {
    return function () {
      var list = SwitchList();
      return new SwitchSearchTab(list, $state, ListFilter(list), RouteHelpers);
    };
  }

  function SwitchSearchTab(list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.name = "switches";
    tab.lang = "switch";
    tab.text = "switch.search.TITLE";
    tab.list = list;
    tab.filter = filter;
    tab.getState = getState;
    tab.getStateParams = getStateParams;
    tab.order = 20;
    tab.results = {
      url: RouteHelpers.basepath("network/switch/search/search.tab.html"),
    };

    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      "network/switch/search/search.item.html"
    );

    //////////

    function getState() {
      return "app.network.switch.view.manage";
    }

    function getStateParams($item) {
      return {
        id: $item.id,
      };
    }
  }
})();
