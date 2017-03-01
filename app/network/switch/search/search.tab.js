(function () {
  'use strict';

  angular
    .module('app.network.switch.search')
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
  function SwitchSearchTabFactory ($state, SwitchList, RouteHelpers) {
    return function () {
        return new SwitchSearchTab(
          SwitchList(),
          $state,
          RouteHelpers
        );
    };
  }

  function SwitchSearchTab (list, $state, RouteHelpers) {
    var tab = this;

    tab.name = 'switches';
    tab.lang = 'switch';
    tab.text = 'switch.search.TITLE';
    tab.list = list;
    tab.select = onSelect;
    tab.order = 20;
    tab.results = {
      url: RouteHelpers.basepath('network/switch/search/search.tab.html'),
    };

    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'network/switch/search/search.item.html'
    );

    //////////

    function onSelect($item, shouldOpenInNewTab, openSelected) {
      openSelected('app.network.switch.view.manage', {
          id: $item.id,
        }, shouldOpenInNewTab);
    }

  }
})();
