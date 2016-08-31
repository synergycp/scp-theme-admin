(function () {
  'use strict';

  angular
    .module('app.hardware.switch.bandwidth')
    .component('switchBandwidthPanel', {
      require: {
      },
      bindings: {
        switch: '=',
        filter: '=?',
        tabActive: '=',
        onTabChange: '&?',
      },
      controller: 'SwitchBandwidthPanelCtrl as panel',
      transclude: true,
      templateUrl: 'app/hardware/switch/bandwidth/bandwidth.panel.html'
    })
    .controller('SwitchBandwidthPanelCtrl', SwitchBandwidthPanelCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchBandwidthPanelCtrl(
    Api,
    Loader,
    SwitchBandwidth,
    BandwidthFilter,
    $stateParams,
    SwitchManageAddTab
  ) {
    var panel = this;

    panel.$onInit = init;
    panel.tabs = {
      active: undefined,
      change: tabChange,
      remove: tabRemove,
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
      panel.tabs.add = SwitchManageAddTab(panel.switch)
        .on('add', onAddTab);
      panel.bandwidth = SwitchBandwidth(panel.switch, panel.filter);
      panel.state.loader.during(
        panel.bandwidth
          .refresh()
          .then(function () {
            var active = panel.tabs.active = parseInt(panel.tabActive);
            var tab = panel.bandwidth.ports[active] || panel.tabs.add;
            tab.active = true;
          })
      );
    }

    function onAddTab(port) {
      panel.tabs.add.active = false;
      Api.wrap(port);
      var tab = panel.bandwidth.add(port);
      tab.active = true;
      //panel.tabs.active = panel.bandwidth.ports.length - 1;
    }

    function tabRemove(tab) {
      _.remove(panel.bandwidth.ports, tab);

      return tab.port
        .patch({ is_primary: false })
        .branch()
          .then(panel.tabs.add.port.refresh)
        .unbranch()
        ;
    }

    function tabChange(tab, index) {
      if (!panel.state.loader.hasLoaded) {
        return false;
      }

      panel.chart = tab.chart;
      setActiveTab(index);

      if (panel.chart) {
        panel.chart.load();
      }
    }

    function setActiveTab(index) {
      var bandwidthTabs = panel.bandwidth.ports;
      /*
      if (panel.tabs.active !== null) {
        if (panel.tabs.active === panel.tabs.active.length) {
          panel.
        }

        bandwidthTabs[panel.tabs.active].active = false;
      }
      */

      panel.tabs.active = panel.tabActive = index;
      (panel.onTabChange || function(){})({
        index: panel.tabs.active,
      });

      /*if (panel.tabs.active < panel.bandwidth.ports.length) {
        bandwidthTabs[panel.tabs.active].active = true;

      }*/
    }
  }
})();
