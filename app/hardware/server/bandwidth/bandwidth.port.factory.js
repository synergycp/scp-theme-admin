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
    BandwidthChart,
    BandwidthFilter,
    ServerBandwidthBilling
  ) {
    return function (server, port) {
        return new ServerBandwidthPort(
          server,
          port,
          BandwidthFilter(),
          ServerBandwidthBilling(),
          BandwidthChart(),
          $q
        );
    };
  }

  function ServerBandwidthPort (server, port, filter, billing, chart, $q) {
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
        $api.get(filterBw)
          .then(storeData)
          .then(setupFilter),
        $api.one('usage')
          .get(filterBw)
          .then(storeBilling),
      ]);
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

      return response;
    }

    function setupFilter(response) {
      if (!response) {
        return;
      }

      filter.setMinTime(response.min_time);
      filter.setMaxTime(response.max_time);
    }

    function storeBilling(data) {
      // TODO console.log(data);
    }
  }
})();
