(function () {
  'use strict';

  angular
    .module('app.hardware.server.bandwidth')
    .controller('ServerBandwidthPanelCtrl', ServerBandwidthPanelCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerBandwidthPanelCtrl(Loader, ServerBandwidth, BandwidthFilter) {
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
        panel.bandwidth
          .refresh()
          .then(function () {
            panel.tabs.active = 0;
          })
      );
    }

    function tabChange(tab) {
      panel.chart = tab.chart;
      panel.filter = tab.filter;
    }
  }
})();
