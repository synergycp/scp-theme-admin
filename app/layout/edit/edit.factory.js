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
  function EditFactory (Api) {
    return function (url) {
      return new Edit(url, Api);
    };
  }

  function Edit(url, Api) {
    var edit = this;
    var $api = Api.one(url);

    edit.patch = patch;
    edit.getCurrent = getCurrent;

    ///////////

    function patch(data) {
      return $api.patch(data);
    }

    function getCurrent(obj) {
      $api.get()
        .then(saveCurrent)
        ;

      function saveCurrent(response) {
        angular.forEach(obj, function (value, key) {
          obj[key] = response[key];
        });
      }
    }
  }
})();
