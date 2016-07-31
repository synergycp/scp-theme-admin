(function () {
  'use strict';

  angular
    .module('app.hardware.server.bandwidth')
    .component('serverBandwidthPanel', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerBandwidthPanelCtrl as panel',
      transclude: true,
      templateUrl: 'app/hardware/server/bandwidth/bandwidth.panel.html'
    })
    .controller('ServerBandwidthPanelCtrl', ServerBandwidthPanelCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerBandwidthPanelCtrl(Loader, ServerBandwidth, BandwidthFilter) {
    var panel = this;

    panel.filter = BandwidthFilter();
    panel.filter.opts = {
      opens: 'left',
      ranges: panel.filter.getRanges(),
      format: 'YYYY-DD-MM',
      startDate: panel.filter.start,
      endDate: panel.filter.end,
      timePicker: true,
      timePicker24Hour: true,
      eventHandlers: {
        'apply.daterangepicker': function (ev, picker) {
          //panel.filter.range = ;
          var input = panel.filter.input;
          panel.filter.start = input.startDate;
          panel.filter.end = input.endDate;
          panel.filter.range = panel.filter.getLabel();

          panel.chart.refresh();
        },
      },
    };
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
