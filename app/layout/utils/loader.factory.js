(function () {
  'use strict';

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
    var loader = this;

    loader.active = false;
    loader.during = during;

    //////////

    function during(promise) {
      loading();

      return promise.then(loaded, loaded);
    }

    function loading() {
      loader.active = true;
    }

    function loaded() {
      loader.active = false;
    }
  }
})();
