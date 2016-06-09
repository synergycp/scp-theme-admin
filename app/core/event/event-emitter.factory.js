(function () {
  'use strict';

  angular
    .module('app.core.event')
    .factory('EventEmitter', EventEmitterFactory);

  /**
   * EventEmitter Factory
   *
   * @ngInject
   */
  function EventEmitterFactory (_) {
    return function () {
        return new EventEmitter(_);
    };
  }

  function EventEmitter (_) {
    var event = this;

    event.callbacks = {};
    event.on = on;
    event.fire = fire;
    event.bindTo = bindTo;

    //////////

    function on(name, callback) {
      var names = angular.isArray(name) ? name : [name];
      _.each(names, function (name) {
        var cbs = event.callbacks[name] = event.callbacks[name] || [];

        cbs.push(callback);
      });

      return event;
    }

    function fire(name) {
      var args = [].splice.call(arguments, 1);
      _.each(event.callbacks[name], function (cb) {
        cb.apply(cb, args);
      });
    }

    function bindTo(target) {
      target.on = _on;
      target.fire = _fire;

      function _on() {
        event.on.apply(event, arguments);

        return target;
      }

      function _fire() {
        event.fire.apply(event, arguments);

        return target;
      }

      return event;
    }
  }
})();
