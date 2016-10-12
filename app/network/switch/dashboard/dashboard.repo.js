(function () {
  'use strict';

  angular
    .module('app.network.switch.dashboard')
    .service('SwitchDashboardRepo', SwitchDashboardRepo)
    .config(addSwitchDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addSwitchDashboardRepo(DashboardProvider) {
    DashboardProvider.add('SwitchDashboardRepo');
  }

  /**
   * SwitchDashboardRepo
   *
   * @ngInject
   */
  function SwitchDashboardRepo(
    Api,
    EventEmitter,
    RouteHelpers,
    DashboardAddPanel,
    DashboardBandwidthPanel,
    _
  ) {
    var repo = this;
    var $api = Api.all('switch/home');

    repo.all = all;
    EventEmitter().bindTo(repo);

    ///////////

    function all() {
      repo.fire(
        'item',
        DashboardAddPanel()
          .on('add', addPanel)
      );

      return $api
        .getList()
        .then(store)
        ;
    }

    function store(results) {
      _.map(results, addPanel);
    }

    function addPanel(homeSwitch) {
      var panel = DashboardBandwidthPanel(homeSwitch);

      repo.fire(
        'item',
        panel.on('delete', fireDelete.bind(null, panel))
      );
    }

    function fireDelete(panel) {
      repo.fire('delete', panel);
    }
  }
})();
