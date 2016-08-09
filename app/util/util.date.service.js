(function () {
  'use strict';

  angular
    .module('app.util')
    .service('date', DateService);

  /**
   * Date Service
   *
   * @ngInject
   */
  function DateService (moment) {
    var date = this;

    date.round = round;
    date.formatDateTime = 'YYYY-MM-DD HH:mm';
    date.formatServer = date.formatDateTime;

    //////////

    function round(date, duration, type) {
      var func = ({
        floor: Math.floor,
        ceil: Math.ceil,
      }[type || ""]) || Math.round;

      return moment(
        func((+date) / (+duration)) * (+duration)
      );
    }
  }
})();
