(function () {
  'use strict';

  angular
    .module('app.util')
    .factory('Refresh', RefreshFactory);

  /**
   * Refresh Factory
   *
   * @ngInject
   */
  function RefreshFactory ($interval) {
    return function (callback) {
        return new Refresh(callback, $interval);
    };
  }

  function Refresh (callback, $interval) {
    var refresh = this;
    var interval;

    refresh.now = now;
    refresh.every = every;
    refresh.stop = stop;
    refresh.limitScope = limitScope;

    //////////

    function now() {
      callback();

      return refresh;
    }

    function every(ms) {
      if (interval) {
        refresh.stop();
      }

      if (ms) {
        interval = $interval(callback, ms);
      }

      return refresh;
    }

    function stop() {
      $interval.cancel(interval);

      return refresh;
    }

    function limitScope($scope) {
      $scope.$on('$destroy', refresh.stop);

      return refresh;
    }
  }
})();
