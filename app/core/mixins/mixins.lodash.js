(function () {
  'use strict';

  angular
    .module('app.core.mixins')
    .config(LodashMixinConfig)
    ;

  /**
   * @ngInject
   */
  function LodashMixinConfig(_) {
    _.mixin({
      setContents: setContents,
    });

    function setContents (dest, origin) {
      dest.length = 0;

      _.each(origin, _.ary(dest.push.bind(dest), 1));
    }
  }
})();
