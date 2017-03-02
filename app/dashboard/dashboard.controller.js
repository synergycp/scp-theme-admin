(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardCtrl', DashboardCtrl)
    ;

  /**
   * Dashboard Controller
   *
   * @ngInject
   */
  function DashboardCtrl(Dashboard, $rootScope) {
    var dash = this;
    var cols = {
      items: [],
      current: 0,
      count: 2,
      addPanel: addPanel,
      delPanel: delPanel,
    };

    dash.cols = cols.items;

    activate();

    //////////

    function activate() {
      for (var i = 0; i < cols.count; i++) {
        cols.items.push([]);
      }

      _.map(Dashboard.get(), addRepo);
      $rootScope.$broadcast('viewContentReadyEvent'); // hide preloader screen (fixes preloader showing too long when a lot of items are on Dashboard)
    }

    function addRepo(repo) {
      return repo
        .on('item', cols.addPanel)
        .on('delete', cols.delPanel)
        .all()
        ;
    }

    function delPanel(panel) {
      _.map(cols.items, removePanel);

      function removePanel(panels) {
        _.remove(panels, panel);
      }
    }

    function addPanel(panel) {
      cols.items[cols.current++].push(panel);

      cols.current = cols.current === cols.count ? 0 : cols.current;
    }
  }
})();
