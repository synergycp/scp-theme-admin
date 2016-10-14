(function () {
  'use strict';

  angular
    .module('app.network.switch.bandwidth')
    .factory('SwitchBandwidthPort', SwitchBandwidthPortFactory);

  /**
   * SwitchBandwidthPort Factory
   *
   * @ngInject
   */
  function SwitchBandwidthPortFactory (
    $q,
    Loader,
    BandwidthChart
  ) {
    return function (target, port, filter) {
        return new SwitchBandwidthPort(
          target,
          port,
          filter,
          Loader(),
          BandwidthChart(),
          $q
        );
    };
  }

  function SwitchBandwidthPort (target, port, filter, loader, chart, $q) {
    // Private variables
    var bandwidth = this;
    var $api = port.one('bandwidth');
    var loadPromise, lastFilter;

    // Public variables
    bandwidth.filter = filter;
    bandwidth.port = port;
    bandwidth.chart = chart;
    bandwidth.chart.refresh = refresh;
    bandwidth.chart.load = load;
    bandwidth.loader = loader;
    bandwidth.loader.loading();

    activate();

    // Private methods
    function activate() {
      /*
      bandwidth.filter.start = moment("2016-06-26 14:30");
      bandwidth.filter.end = moment("2016-06-27 14:30");
      */
    }

    function refresh() {
      lastFilter = getFilter();
      loadPromise = $api
        .get(lastFilter)
        .then(storeData)
        .then(setupFilter);

      return bandwidth.loader.during(loadPromise);
    }

    function load() {
      return (loadPromise && _.isEqual(lastFilter, getFilter())) ||
        refresh();
    }

    function getFilter() {
      return {
        start: formatDateForServer(bandwidth.filter.start),
        end: formatDateForServer(bandwidth.filter.end),
      };
    }

    function formatDateForServer(date) {
      return typeof date === "undefined" ? undefined  :
        date.utc().format('YYYY-MM-DD HH:mm');
    }

    function storeData(response) {
      bandwidth.chart.firstLoad = false;
      bandwidth.chart.isActive = response.status === 1;
      bandwidth.chart.hasData = !!response.min_time;

      if (!bandwidth.chart.isActive) {
        return;
      }

      bandwidth.chart.setData(response.data);
      bandwidth.chart.setLabels(response.labels);
      bandwidth.chart.stats.set(response.stats);

      return response;
    }

    function setupFilter(response) {
      if (!response) {
        return;
      }

      filter.setMinTime(response.min_time);
      filter.setMaxTime(response.max_time);
    }
  }
})();
