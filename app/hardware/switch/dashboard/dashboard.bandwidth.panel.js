(function () {
  'use strict';

  var DIR = 'hardware/switch/dashboard/';

  angular
    .module('app.hardware.switch.dashboard')
    .factory('DashboardBandwidthPanel', DashboardBandwidthPanelFactory)
    ;

  /**
   * DashboardBandwidthPanel Factory
   *
   * @ngInject
   */
  function DashboardBandwidthPanelFactory (
    Loader,
    RouteHelpers,
    EventEmitter,
    BandwidthFilter,
    BandwidthState,
    SwitchBandwidthPort,
    Config,
    Api,
    _
  ) {
    return function (homeSwitch) {
        return new DashboardBandwidthPanel(
          homeSwitch,
          Loader,
          RouteHelpers,
          EventEmitter,
          BandwidthFilter,
          BandwidthState,
          SwitchBandwidthPort,
          Config,
          Api,
          _
        );
    };
  }

  function DashboardBandwidthPanel (
    homeSwitch,
    Loader,
    RouteHelpers,
    EventEmitter,
    BandwidthFilter,
    BandwidthState,
    SwitchBandwidthPort,
    Config,
    Api,
    _
  ) {
    var panel = this;
    var filter = BandwidthFilter().setOptions({
      opens: 'left',
    });
    Config
      .getSwitchBandwidthRange()
      .then(filter.setRangeByLabel)
      ;

    _.extend(
      homeSwitch.switch,
      Api
        .all('switch')
        .one(''+homeSwitch.switch.id)
    );

    _.extend(
      homeSwitch,
      homeSwitch.switch
        .all('home')
        .one(''+homeSwitch.id)
    );

    panel.templateUrl = RouteHelpers.basepath(
      DIR+'dashboard.bandwidth.html'
    );
    panel.context = {
      homeSwitch: homeSwitch,
      showFooter: false,
      filter: filter,
      loader: Loader(),
      state: BandwidthState(),
      bandwidth: SwitchBandwidthPort(
        homeSwitch.switch,
        homeSwitch.switch
          .all('port')
          .one(''+homeSwitch.port.id),
        filter
      ),
      delete: onDelete,
    };
    EventEmitter().bindTo(panel);

    panel.context.bandwidth.chart.width = 800;
    panel.context.bandwidth.chart.height = 240;

    panel.context.filter.on(
      'change',
      panel.context.bandwidth.chart.refresh
    );

    //////////

    function onDelete() {
      homeSwitch.remove();
      panel.fire('delete');
    }
  }
})();
