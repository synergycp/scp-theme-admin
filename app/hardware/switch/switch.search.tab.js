(function () {
  'use strict';

  angular
    .module('app.hardware.switch')
    .factory('SwitchSearchTab', SwitchSearchTabFactory)
    .run(addSwitchSearchTab)
    ;

  /**
   * Add the SwitchSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addSwitchSearchTab(Search, SwitchSearchTab) {
    Search.tab.add(SwitchSearchTab());
  }

  /**
   * SwitchSearchTab Factory
   *
   * @ngInject
   */
  function SwitchSearchTabFactory (SwitchList, RouteHelpers) {
    return function () {
        return new SwitchSearchTab(
          SwitchList(),
          RouteHelpers
        );
    };
  }

  function SwitchSearchTab (list, RouteHelpers) {
    var tab = this;

    tab.name = 'switches';
    tab.list = list;
    tab.text = 'hardware.switch.search.TITLE';
    tab.results = {
      url: RouteHelpers.basepath('hardware/switch/switch.search.tab.html'),
    };

    //////////


  }
})();
