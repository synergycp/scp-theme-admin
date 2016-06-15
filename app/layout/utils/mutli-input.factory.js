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
  function MultiInputFactory () {
    return function (make) {
        return new MultiInput(make);
    };
  }

  function MultiInput (make) {
    var multi = this;

    multi.max = null;
    multi.items = [];
    multi.add = setIndex;
    multi.rem = delIndex;
    multi.setMax = setMax;

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

      return multi;
    }

    function delIndex($index) {
      multi.items.splice($index, 1);

      return multi;
    }
  }
})();
