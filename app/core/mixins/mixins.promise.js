(function () {
  'use strict';

  angular
    .module('app.core.mixins')
    .config(configPromiseMixins)
    ;

  /**
   * @ngInject
   */
  function configPromiseMixins($provide) {
    var carryProperties = ['parent'];
    var mixins = {
      /**
       * Branches do not catch errors from above them in the promise chain,
       * and do not pass anything down the promise chain.
       *
       * They DO get the result of the promise above them in the promise chain.
       */
      branch: function (promise) {
        var branch = promise.$q.defer();

        branch.promise.parent = promise;

        promise.then(function(result) {
          branch.resolve(result);

          return result;
        });

        return branch.promise;
      },
      unbranch: function (promise) {
        if (!promise.parent) {
          throw new Error('Can\'t unbranch, no parent branch found!');
        }

        return promise.parent;
      },
    };
    $provide.decorator('$q', $q);

    function $q($delegate) {
      // Extend promises with mixins
      function decoratePromise(promise, parent) {
        if (parent) {
          _.each(carryProperties, function (prop) {
            if (prop in parent) {
              promise[prop] = parent[prop];
            }
          });
        }
        promise._then = promise.then;
        promise.$q = $delegate;
        promise.then = function(thenFn, errFn, notifyFn) {
          return decoratePromise(
            promise._then(thenFn, errFn, notifyFn),
            promise
          );
        };

        _.each(mixins, function (mixin, key) {
          promise[key] = function () {
            var args = [].slice.call(arguments);
            args.unshift(promise);

            return mixin.apply(promise, args);
          };
        });

        return promise;
      }

      var defer = $delegate.defer,
          when = $delegate.when,
          reject = $delegate.reject,
          all = $delegate.all;
      $delegate.defer = function() {
        var deferred = defer();
        decoratePromise(deferred.promise);
        return deferred;
      };
      $delegate.when = function() {
        var p = when.apply(this, arguments);
        return decoratePromise(p);
      };
      $delegate.reject = function() {
        var p = reject.apply(this, arguments);
        return decoratePromise(p);
      };
      $delegate.all = function() {
        var p = all.apply(this, arguments);
        return decoratePromise(p);
      };

      return $delegate;
    }
  }
})();
