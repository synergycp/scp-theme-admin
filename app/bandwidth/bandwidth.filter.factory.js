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

    filter.options = options;
    filter.range = filter.options.defaultRange;
    filter.isSetup = false;
    filter.input = {
      startDate: null,
      endDate: null,
    };
    filter.min = undefined;
    filter.max = moment().add(5, 'minutes').format('YYYY-DD-MM');

    filter.setDate = setDate;
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

    function activate() {
      event.bindTo(filter);

      filter.start = filter.defaultStartTime();
      filter.end = filter.defaultEndTime();
    }

    /**
     * Set the date of the date range picker.
     *
     * @param {moment} start
     * @param {moment} end
     * @param {string|null} label
     */
    function setDate(start, end) {
      filter.input.startDate = start;
      filter.input.endDate = end;
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
     * Setup the datepicker based on the API result.
     *
     * @param  {ApiResponse} response
     * @return {boolean} whether or not there was an error while setting up
     */
    function setUp() {
      var ranges = filter.getRanges();
      var startTime = filter.defaultStartTime();
      var endTime = filter.defaultEndTime();
      var timeDiff = endTime - startTime;

      filter.isSetup(true);

      if (!maxTime.isBefore(startTime)) {
        return true;
      }

      // trigger date choice change
      endTime = endTime.max(maxTime);
      startTime = moment(endTime - timeDiff).min(minTime);
      filter.setDate(startTime, endTime);
      return false;
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
      return {
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
      return filter.input.startDate.format('M/DD HH:mm') +
             ' - ' +
             filter.input.endDate.format('M/DD HH:mm')
             ;
    }
  }
})();
