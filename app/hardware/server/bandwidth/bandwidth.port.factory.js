(function () {
  'use strict';

  angular
    .module('app.hardware.server.bandwidth')
    .factory('ServerBandwidthPort', ServerBandwidthPortFactory);

  /**
   * ServerBandwidthPort Factory
   *
   * @ngInject
   */
  function ServerBandwidthPortFactory (
    $q,
    Date,
    BandwidthChart,
    BandwidthFilter,
    ServerBandwidthBilling
  ) {
    return function (server, port, filter) {
        return new ServerBandwidthPort(
          server,
          port,
          filter || BandwidthFilter(),
          ServerBandwidthBilling(),
          BandwidthChart(),
          Date,
          $q
        );
    };
  }

  function ServerBandwidthPort (server, port, filter, billing, chart, Date, $q) {
    // Private variables
    var bandwidth = this;
    var $api = port.one('bandwidth');

    // Public variables
    bandwidth.filter = filter;
    bandwidth.billing = billing;
    bandwidth.port = port;
    bandwidth.chart = chart;
    bandwidth.chart.refresh = refresh;

    activate();

    // Private methods
    function activate() {
      /*
      bandwidth.filter.start = moment("2016-06-26 14:30");
      bandwidth.filter.end = moment("2016-06-27 14:30");
      */

      return bandwidth.chart.refresh();
    }

    function refresh() {
      var filterBw = {
        start: formatDateForServer(bandwidth.filter.start),
        end: formatDateForServer(bandwidth.filter.end),
      };

      return $q.all([
        $api
          .get(filterBw)
          .then(storeData)
          .then(setupFilter),
        $api
          .getList('usage')
          .then(storeBilling),
      ]);
    }

    function formatDateForServer(dateVal) {
      return typeof dateVal === "undefined" ? undefined  :
        dateVal.utc().format(Date.formatServer);
    }

    function storeData(response) {
      bandwidth.chart.firstLoad = false;
      bandwidth.chart.isActive = response.status === 1;
      bandwidth.chart.hasData = !!response.min_time;

      if (!bandwidth.chart.isActive) {
        return;
      }

      bandwidth.chart.setData(response.data);
      bandwidth.chart.setLabels(response.from_time, response.to_time);
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

    function storeBilling(usageData) {
      var billing = bandwidth.billing;
      var data = usageData.length ? usageData[0] : null;
      billing.isActive = data && 'used' in data;
      if (!billing.isActive) {
        return false;
      }

      billing.max = data.max;
      billing.used = data.used;
      billing.cycleStart = Date.parse(data.cycle_started_at.iso_8601).format(Date.formatDate);
      billing.percent = data.percent;
    }
  }
})();
