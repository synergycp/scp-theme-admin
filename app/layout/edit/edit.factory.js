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

    // Public methods
    edit.patch = patch;
    edit.getCurrent = getCurrent;
    event.bindTo(edit);

    // Private methods
    function patch(data) {
      return edit.loader.during(
        $api.patch(data).then(fireChangeEvent)
      );
    }

    function fireChangeEvent() {
      event.fire('change');
    }

    function getCurrent(obj) {
      edit.loader.during(
        $api.get().then(saveCurrent)
      );

      function saveCurrent(response) {
        angular.forEach(obj, function (value, key) {
          obj[key] = response[key];
        });
      }
    }
  }
})();
