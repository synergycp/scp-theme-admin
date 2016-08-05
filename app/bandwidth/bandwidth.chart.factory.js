(function () {
  'use strict';

  angular
    .module('app.bandwidth')
    .factory('BandwidthChart', BandwidthChartFactory);

  /**
   * BandwidthChart Factory
   *
   * @ngInject
   */
  function BandwidthChartFactory (numeral) {
    return function () {
        return new BandwidthChart(numeral);
    };
  }

  function BandwidthChart (numeral) {
    var chart = this;
    var divideBy = 1;

    chart.isActive = false;
    chart.firstLoad = true;
    chart.hasData = false;
    chart.hasFilteredData = false;
    chart.data = [];
    chart.labels = [];
    chart.series = ['In', 'Out'];
    chart.options = {
      elements: {
        point: {
          hitRadius: 4,
        },
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label +
              ": " +
              toBitRate(tooltipItem.yLabel);
          },
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            callback: function(value, index, values) {
              return toBitRate(value);
            },
          },
        }],
      }
    };
    chart.width = 700;
    chart.height = 250;
    chart.rawData = [];
    chart.rawLabels = [];
    chart.showStats = false;

    chart.setData = setData;
    chart.setLabels = setLabels;

    //////////

    function setLabels (labels) {
      _.setContents(chart.rawLabels, labels);

      resetData(chart.width);
    }

    function toSize (num) {
      return numeral(num).format('0,0.0000b');
    }

    function toBitRate (num) {
      return numeral(num)
        .format('0,0.00b')
        .toLowerCase() +
        'ps';
    }

    function setData (data) {
      if (!chart.hasData) {
        return;
      }

      fillChartArray(chart.rawData, data);

      chart.hasFilteredData = chart.rawData.length &&
        chart.rawData[0].length;

      resetData(chart.width);
    }

    function fillChartArray(dest, origin) {
      _.each(origin, function (data, key) {
        var curr = dest[key];
        if (typeof curr === "undefined") {
          dest[key] = data;
          return;
        }

        _.setContents(curr, data);
      });
    }

    function resetData (width) {
      var total = chart.rawLabels.length;
      var can_fit = width / (width > 1000 ? 20 : 11);
      divideBy = Math.ceil(total / can_fit);

      // If all the labels are on the same day, don't show date.
      var first = moment.unix(chart.rawLabels[0]);
      var last = moment.unix(chart.rawLabels[total - 1]);
      var labelFormat = first.isSame(last, 'day') ? 'HH:mm' : 'M/DD HH:mm';

      var sets = chart.rawData.length;
      var sum = Array.apply(null, Array(sets)).map(Number.prototype.valueOf, 0);
      var skip, k;

      for (k = 0; k < sets; k++) {
        chart.data[k] = chart.data[k] || [];
      }

      //chart.labels = [];
      var a = -1;
      for (var i = 0; i < total; i++) {
        skip = divideBy && ((i + 1) % divideBy > 0);
        if (!skip) {
          a++;
          chart.labels[a] = formatLabel(chart.rawLabels[i]);
        }

        for (k = 0; k < sets; k++) {
          sum[k] += chart.rawData[k][i] || 0;

          if (skip) {
            continue;
          }

          chart.data[k][a] = Math.round(divideBy ? sum[k] / divideBy : sum[k]);
          sum[k] = 0;
        }
      }

      /**
       * @param  {int} time
       *
       * @return {string}
       */
      function formatLabel(time) {
        return moment.unix(time).format(labelFormat);
      }
    }
  }
})();
