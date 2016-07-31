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
