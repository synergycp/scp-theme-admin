(function () {
  'use strict';

  var OPTIONS = {
    refresh: function () {},
    defaultRange: 'Last 6 Hours'
  };

  angular
    .module('app.bandwidth')
    .factory('BandwidthFilter', BandwidthFilterFactory);

  /**
   * BandwidthFilter Factory
   *
   * @ngInject
   */
  function BandwidthFilterFactory(moment, date, EventEmitter, _) {
    return function (options) {
      return new BandwidthFilter(
        _.assign({}, OPTIONS, options || {}),
        moment,
        EventEmitter(),
        date,
        _
      );
    };
  }

  function BandwidthFilter(options, moment, event, date, _) {
    var filter = this;
    var thirty_m = moment.duration(30, 'minutes');
    var now = date.round(
      moment(),
      thirty_m,
      'ceil'
    );
    var last_hour = date.round(
      moment().subtract(1, 'hours'),
      thirty_m,
      'floor'
    );
    var ranges = {
      'Last Hour': [last_hour, now],
      'Last 6 Hours': [
        moment(now).subtract(6, 'hours'),
        now
      ],
      'Last Day': [
        moment(now).subtract(1, 'day'),
        now
      ],
      'Last Week': [
        moment(now).subtract(1, 'week'),
        now
      ],
      'Last Month': [
        moment(now).subtract(1, 'month'),
        now
      ]
    };

    filter.setOptions = setOptions;
    filter.setRange = setRange;
    filter.setMinTime = setMinTime;
    filter.setMaxTime = setMaxTime;
    filter.startTime = startTime;
    filter.endTime = endTime;
    filter.defaultStartTime = defaultStartTime;
    filter.defaultEndTime = defaultEndTime;
    filter.getRanges = getRanges;
    filter.getLabel = getLabel;

    activate();

    //////////

    function setOptions(options) {
      _.assign(filter.opts, options);

      return filter;
    }

    function activate() {
      filter.options = options;
      filter.range = filter.options.defaultRange;
      filter.isSetup = false;
      filter.input = {
        startDate: filter.start = filter.defaultStartTime(),
        endDate: filter.end = filter.defaultEndTime(),
      };
      filter.min = undefined;
      filter.max = moment().add(5, 'minutes').format('YYYY-DD-MM');

      filter.opts = {
        ranges: ranges,
        format: 'YYYY-DD-MM',
        startDate: filter.start,
        endDate: filter.end,
        timePicker: true,
        timePicker24Hour: true,
        eventHandlers: {
          'apply.daterangepicker': function () {
            filter.setRange(
              filter.input.startDate,
              filter.input.endDate
            );
          },
        },
      };

      event.bindTo(filter);
      filter.on('change', setRangeLabel);
    }

    function setRangeLabel() {
      filter.range = filter.getLabel();
    }

    /**
     * Set the date of the date range picker.
     *
     * @param {moment} start
     * @param {moment} end
     * @param {string|null} label
     */
    function setRange(start, end) {
      filter.fire(
        'change',
        filter.input.startDate = filter.start = moment(start),
        filter.input.endDate = filter.end = moment(end)
      );
    }

    /**
     * @param {int} minTime
     *
     * @return {this}
     */
    function setMinTime(minTime) {
      filter.min = minTime ? moment.unix(minTime).format('YYYY-DD-MM') : undefined;

      return filter;
    }

    /**
     * @param {int} minTime
     *
     * @return {this}
     */
    function setMaxTime(maxTime) {
      filter.max = maxTime ? moment.unix(maxTime).format('YYYY-DD-MM') : undefined;

      return filter;
    }

    /**
     * Get the currently selected start time.
     *
     * @return {moment|null}
     */
    function startTime() {
      return filter.start;
    }

    /**
     * Get the currently selected end time.
     *
     * @return {moment|null}
     */
    function endTime() {
      return filter.end;
    }

    /**
     * Get the default selected start time.
     *
     * @return {moment|null}
     */
    function defaultStartTime() {
      return filter.getRanges()[filter.options.defaultRange][0];
    }

    /**
     * Get the default selected end time.
     *
     * @return {moment|null}
     */
    function defaultEndTime() {
      return filter.getRanges()[filter.options.defaultRange][1];
    }

    /**
     * Get the datepicker ranges
     *
     * @return {object}
     */
    function getRanges() {
      return ranges;
    }

    function getLabel() {
      var didFind = _.find(filter.getRanges(), function (range, label) {
        if (!matchesInput(range)) {
          return;
        }

        filter.range = label;
        return true;
      });

      if (!didFind) {
        filter.range = makeLabel();
      }

      return filter.range;

      function matchesInput(range) {
        // This doesn't work because of min and max dates.
        return range[0].isSame(filter.input.startDate) &&
               range[1].isSame(filter.input.endDate);
      }
    }

    function makeLabel() {
      return filter.start.format('M/DD HH:mm') +
             ' - ' +
             filter.end.format('M/DD HH:mm')
             ;
    }
  }
})();
