(function () {
  'use strict';

  angular
    .module('app.layout.utils')
    .factory('MultiInput', MultiInputFactory);

  /**
   * MultiInput Factory
   *
   * @ngInject
   */
  function MultiInputFactory (EventEmitter) {
    return function (make) {
        return new MultiInput(make, EventEmitter());
    };
  }

  function MultiInput (make, event) {
    var multi = this;

    multi.max = null;
    multi.items = [];
    multi.add = setIndex;
    multi.rem = delIndex;
    multi.setMax = setMax;
    event.bindTo(multi);
    /*event.on(['rem', 'set', 'add'], function () {
      event.fire.bind(null, arguments)();
    });*/

    //////////

    function setMax(max) {
      multi.max = max;

      return multi;
    }

    function setIndex(selected, key) {
      var length = multi.items.length;
      if (typeof key === "undefined") {
        key = length;
        if (multi.max && length >= multi.max) {
          return multi;
        }
      }
      var del = length > key;
      var item = make(selected);
      multi.items.splice(key, del, item);
      event.fire(del ? 'set' : 'add', item, key);

      return multi;
    }

    function delIndex($index) {
      var items = multi.items.splice($index, 1);
      event.fire('rem', items.pop());

      return multi;
    }
  }
})();
