(function () {
  'use strict';

  var CLASS = {
    start: 'relative',
    loading: 'relative loading',
    loaded: 'relative',
  };

  angular
    .module('app.layout.utils')
    .factory('Loader', LoaderFactory);

  /**
   * Loader Factory
   *
   * @ngInject
   */
  function LoaderFactory () {
    return function () {
        return new Loader();
    };
  }

  function Loader () {
    // Private variables
    var loader = this;

    // Public variables
    loader.active = false;
    loader.class = CLASS.start;

    // Public methods
    loader.during = during;
    loader.loaded = loaded;
    loader.loading = loading;

    //////////

    function during(promise) {
      loading();

      return promise.then(loaded, loaded);
    }

    function loading() {
      loader.active = true;
      loader.class = CLASS.loading;
    }

    function loaded() {
      loader.active = false;
      loader.class = CLASS.loaded;
    }
  }
})();
