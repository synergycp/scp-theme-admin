(function () {
  'use strict';

  angular
    .module('app.hardware.server.bandwidth')
    .controller('ServerBandwidthPanelCtrl', ServerBandwidthPanelCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerBandwidthPanelCtrl(
    Loader,
    ServerBandwidth,
    BandwidthFilter,
    Config
  ) {
    var panel = this;

    panel.$onInit = init;
    panel.tabs = {
      active: undefined,
      change: tabChange,
    };
    panel.state = {
      fullScreen: false,
      loader: Loader(),
      filtering: function () {
        // TODO: fix
        $('.date-picker').click();
      },
    };

    //////////

    function init() {
      panel.filter = panel.filter || BandwidthFilter();
      panel.filter.setOptions({
        opens: 'left',
      }).on('change', function () {
        if (panel.chart) {
          panel.chart.refresh();
        }
      });

      panel.bandwidth = ServerBandwidth(panel.server, panel.filter);
      panel.state.loader.during(
        Config
          .getServerBandwidthRange()
          .then(setFilterRange)
          .then(refreshBandwidth)
      );
    }

    function setFilterRange(range) {
      panel.filter.setRangeByLabel(range);
    }

    function refreshBandwidth() {
      return panel.bandwidth
        .refresh()
        .then(setActiveTab)
        ;
    }

    function setActiveTab() {
      panel.tabs.active = 0;
    }

    function tabChange(tab) {
      panel.chart = tab.chart;
      panel.filter = tab.filter;
    }
  }
})();
