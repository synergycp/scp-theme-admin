(function () {
  'use strict';

  angular
    .module('app.core.mixins')
    .service('$debounce', debounce)
    ;

  /**
   * @ngInject
   */
  function debounce($timeout, $q) {
    return function (func, wait, immediate, invokeApply) {
      var timeout, args, context, result;

      function debounce() {
        /* jshint validthis:true */
        context = this;
        args = arguments;

        cancel();

        if (immediate) {
          return $q.when(null).then(later);
        }

        timeout = $timeout(later, wait, invokeApply);

        return timeout;

        function later() {
          timeout = null;

          return func.apply(context, args);
        }
      }

      debounce.cancel = cancel;

      return debounce;

      function cancel() {
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = null;
      }
    };
  }
})();
