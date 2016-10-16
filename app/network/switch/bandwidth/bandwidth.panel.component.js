(function () {
  'use strict';

  angular
    .module('app.network.switch.bandwidth')
    .component('switchBandwidthPanel', {
      require: {
      },
      bindings: {
        switch: '=',
        filter: '=',
        tabActive: '=',
        onTabChange: '&?',
      },
      controller: 'SwitchBandwidthPanelCtrl as panel',
      transclude: true,
      templateUrl: 'app/network/switch/bandwidth/bandwidth.panel.html'
    })
    .controller('SwitchBandwidthPanelCtrl', SwitchBandwidthPanelCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchBandwidthPanelCtrl(
    Api,
    Loader,
    Config,
    SwitchBandwidth,
    BandwidthFilter,
    $timeout,
    $stateParams,
    SwitchManageAddTab
  ) {
    var panel = this;
    var filterOptions = {
      opens: 'left',
    };

    panel.$onInit = init;
    panel.tabs = {
      active: undefined,
      change: tabChange,
      remove: tabRemove,
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

      panel.tabs.add = SwitchManageAddTab(panel.switch)
        .on('add', onAddTab)
        ;
      panel.bandwidth = SwitchBandwidth(panel.switch, panel.filter);
      panel.state.loader.loading();

      if (panel.filter.input.startDate) {
        return filterChange().then(setupActiveTab);
      }

      return Config
        .getSwitchBandwidthRange()
        .then(panel.filter.setRangeByLabel)
        ;
    }

    function filterChange() {
      return panel.state.loader.during(
        (panel.chart || panel.bandwidth).refresh()
      );
    }

    function setupActiveTab() {
      var active =
        parseInt(panel.tabActive) == panel.tabActive ?
        parseInt(panel.tabActive) : panel.tabActive
        ;
      var tab = panel.bandwidth.ports[active] || panel.tabs.add;
      panel.tabs.active = tab === panel.tabs.add ? 'add' : active;
      tab.active = true;
    }

    function onAddTab(port) {
      Api.wrap(port);
      panel.bandwidth.add(port).active = true;

      $timeout(
        setActiveTab.bind(null, panel.bandwidth.ports.length - 1)
      );
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
