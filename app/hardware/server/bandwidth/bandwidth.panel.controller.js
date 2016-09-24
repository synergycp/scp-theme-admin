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
    ServerBandwidth
  ) {
    var panel = this;
    var filterOptions = {
      opens: 'left',
    };

    panel.$onInit = init;
    panel.tabs = {
      active: undefined,
      change: tabChange,
    };
    panel.state = {
      fullScreen: false,
      loader: Loader(),
    };

    //////////

    function init() {
      panel.filter
        .setOptions(filterOptions)
        .on('change', filterChange)
        ;

      panel.bandwidth = ServerBandwidth(panel.server, panel.filter);
      panel.state.loader.loading();

      if (panel.filter.input.startDate) {
        filterChange();
      }
    }

    function filterChange() {
      panel.state.loader.during(
        (panel.chart || panel.bandwidth).refresh()
      );
    }

    function tabChange(tab) {
      panel.chart = tab.chart;
      panel.filter = tab.filter;
    }
  }
})();
