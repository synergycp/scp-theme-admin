(function () {
  'use strict';

  angular
    .module('app.core.mixins')
    .config(LodashMixinConfig);

  /**
   * @ngInject
   */
  function LodashMixinConfig(_) {
    _.mixin({
      setContents: setContents,
      enhance: enhance,
      makeArray: makeArray,
    });

    function makeArray(length, value) {
      var arr = [];
      while (--length >= 0) {
        arr[length] = value;
      }

      return arr;
    }

    function setContents(dest, origin) {
      dest.length = 0;

      _.each(origin, _.ary(dest.push.bind(dest), 1));
    }

    function enhance(list, source) {
      return _.map(list, function (element) {
        return _.extend({}, element, source);
      });
    }
  }
})();
