(function () {
  'use strict';

  angular
    .module('app.layout')
    .factory('Edit', EditFactory);

  /**
   * Edit Factory
   *
   * @ngInject
   */
  function EditFactory (Api, Loader, EventEmitter) {
    return function (url) {
      return new Edit(Api.one(url), Loader(), EventEmitter());
    };
  }

  function Edit($api, loader, event) {
    // Private variables
    var edit = this;

    // Public variables
    edit.loader = loader;
    edit.input = {};

    // Public methods
    edit.patch = patch;
    edit.getCurrent = getCurrent;
    event.bindTo(edit);

    // Private methods
    function patch(data) {
      return edit.loader.during(
        $api.patch(data)
          .then(saveCurrent)
          .then(fireChangeEvent)
      );
    }

    function getCurrent(obj) {
      edit.input = obj || edit.input;

      return edit.loader.during(
        $api.get()
          .then(saveCurrent)
          .then(fireLoadEvent)
      );
    }

    function saveCurrent(response) {
      _.forEach(edit.input, function (value, key) {
        edit.input[key] = response[key];
      });
    }

    function fireLoadEvent() {
      event.fire('load');
    }

    function fireChangeEvent() {
      event.fire('change');
    }
  }
})();
