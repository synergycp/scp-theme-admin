(function () {
  'use strict';

  angular
    .module('app.hardware.switch.bandwidth')
    .component('switchBandwidthPanel', {
      require: {
      },
      bindings: {
        switch: '=',
      },
      controller: 'SwitchBandwidthPanelCtrl as panel',
      transclude: true,
      templateUrl: 'app/hardware/switch/bandwidth/bandwidth.panel.html'
    })
    .controller('SwitchBandwidthPanelCtrl', SwitchBandwidthPanelCtrl)
    .factory('AddTabPanel', AddTabPanelFactory)
    ;

  /**
   * @ngInject
   */
  function SwitchBandwidthPanelCtrl(
    Api,
    Loader,
    SwitchBandwidth,
    BandwidthFilter,
    AddTabPanel
  ) {
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
      panel.tabs.add = AddTabPanel(panel.switch).on('add', function (port) {
        panel.tabs.add.active = false;
        Api.wrap(port);
        var tab = panel.bandwidth.add(port);
        tab.active = true;
        //panel.tabs.active = panel.bandwidth.ports.length - 1;
      });
      panel.bandwidth = SwitchBandwidth(panel.switch, panel.filter);
      panel.state.loader.during(
        panel.bandwidth
          .refresh()
          .then(function () {
            var tab = panel.bandwidth.ports[0] || panel.tabs.add;
            tab.active = true;
          })
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

    function tabChange(tab) {
      panel.chart = tab.chart;

      if (panel.chart) {
        panel.chart.load();
      }
    }
  }

  /**
   * @ngInject
   */
  function AddTabPanelFactory(Select, EventEmitter, Alert) {
    return function(hub) {
      return new AddTabPanel(
        hub,
        EventEmitter(),
        Select('switch/'+hub.id+'/port').filter({ is_primary: false }),
        Alert
      );
    };
  }

  function AddTabPanel(hub, event, selectPort, Alert) {
    // Private variables
    var tab = this;

    // Public variables
    tab.port = selectPort;

    // Public methods
    tab.submit = submit;

    event.bindTo(tab);

    //////////

    function submit() {
      var port = tab.port.selected;
      if (!port) {
        return Alert.warning('Please select a port to add.');
      }

      if (port.is_primary) {
        return Alert.warning('That port is already a primary port.');
      }

      return port
        .patch({ is_primary: true })
        .then(fireAddEvent)
        .branch()
          .then(refresh)
        .unbranch()
        ;
    }

    function fireAddEvent(port) {
      event.fire('add', port);

      return port;
    }

    function refresh() {
      tab.port.refresh();
      tab.port.selected = null;
    }
  }
})();
