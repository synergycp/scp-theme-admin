(function () {
  'use strict';

  angular
    .module('app.network.switch.dashboard')
    .service('SwitchDashboardRepo', SwitchDashboardRepo)
    .run(addSwitchDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addSwitchDashboardRepo(Dashboard, Permission, Auth) {
    var show = Dashboard.add.bind(null, 'SwitchDashboardRepo');
    var hide = Dashboard.remove.bind(null, 'SwitchDashboardRepo');

    Auth.whileLoggedIn(checkPerms, hide);

    function checkPerms() {
      Permission
        .ifHas('network.switches.read')
        .then(show)
      ;
    }
  }

  /**
   * SwitchDashboardRepo
   *
   * @ngInject
   */
  function SwitchDashboardRepo(
    Api,
    EventEmitter,
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
