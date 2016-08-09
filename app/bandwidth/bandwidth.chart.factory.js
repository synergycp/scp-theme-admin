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
  function BandwidthChartFactory(numeral, bitsToSizeFilter) {
    return function () {
      return new BandwidthChart(numeral, bitsToSizeFilter);
    };
  }

  function BandwidthChart(numeral, bitsToSize) {
    var chart = this;
    var divideBy = 1;

    chart.isActive = false;
    chart.firstLoad = true;
    chart.hasData = false;
    chart.hasFilteredData = false;
    chart.data = [];
    chart.labels = [];
    chart.series = ['In', 'Out', '95%'];
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
            callback: function (value, index, values) {
              return toBitRate(value);
            },
          },
        }],
      }
    };
    chart.width = 1800;
    chart.height = 350;
    chart.rawData = [];
    chart.rawLabels = [];
    chart.showStats = false;
    chart.dataSetOptions = [];

    chart.setData = setData;
    chart.stats = {
      set: setStats,
      cols: [],
    };
    chart.setLabels = setLabels;
    chart.addTopPctLine = addTopPctLine;

    //////////

    function setLabels(labels) {
      _.setContents(chart.rawLabels, labels);

      resetData(chart.width);
    }

    function toBitRate(num) {
      return numeral(num)
        .format('0,0.00b')
        .toLowerCase() +
        'ps';
    }

    function setData(data) {
      if (!chart.hasData) {
        return;
      }

      fillChartArray(chart.rawData, data);

      chart.hasFilteredData = chart.rawData.length &&
        chart.rawData[0].length;

      resetData(chart.width);
    }

    function setStats(stats) {
      chart.showStats = !!stats.length;
      if (!chart.showStats) {
        return;
      }

      var topMax = 0;
      var total = numeral(0);

      _.each(stats, function (stat, key) {
        var sum = numeral(stat.sum);
        var avg = numeral(stat.avg);
        var min = numeral(stat.min);
        var max = numeral(stat.max);
        var top = stat.nf;

        total.add(sum);
        topMax = Math.max(topMax, top);

        var statCol = chart.stats.cols[key] = chart.stats.cols[key] || {
          label: key % 2 ? 'OUT' : 'IN',
          items: [],
        };

        var items = statCol.items;

        items[0] = (items[0] || new Stat('MIN')).setValue(toBitRate(min));
        items[1] = (items[1] || new Stat('MAX')).setValue(toBitRate(max));
        items[2] = (items[2] || new Stat('TOP')).setValue(toBitRate(top));
      });

      var len = stats.length;
      var totalCol = chart.stats.cols[len] = chart.stats.cols[len] || {
        label: 'TOTAL',
        items: [],
      };

      var items = totalCol.items;
      items[0] = (items[0] || new Stat('TOTAL')).setValue(bitsToSize(total));
      items[1] = (items[1] || new Stat('TOP-MAX')).setValue(toBitRate(topMax));

      addTopPctLine(topMax);
    }

    function addTopPctLine(topPct) {
      var dataSetIndex = chart.rawData.length;
      var opts = chart.dataSetOptions;
      chart.data[dataSetIndex] = _.makeArray(chart.data[0].length, topPct);
      opts[dataSetIndex] = opts[dataSetIndex] || {};
      _.assign(opts[dataSetIndex], {
        fill: false,
        borderColor: '#f00',
        pointRadius: 0,
      });
    }

    function fillChartArray(dest, origin) {
      dest.length = origin.length;
      _.each(origin, function (data, key) {
        chart.dataSetOptions[key] = {};

        var curr = dest[key];
        if (typeof curr === "undefined") {
          dest[key] = data;
          return;
        }

        _.setContents(curr, data);
      });
    }

    function resetData(width) {
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

          chart.data[k][a] = Math.round(sum[k] / (divideBy || 1));
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

  function Stat(label) {
    var stat = this;

    stat.label = label;
    stat.setValue = setValue;

    return stat;

    function setValue(value) {
      stat.value = value;

      return stat;
    }
  }
})();
