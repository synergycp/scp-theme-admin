(function () {
  'use strict';

  angular
    .module('app.hardware.part')
    .factory('PartTab', PartTabFactory);

  /**
   * PartTab Factory
   *
   * @ngInject
   */
  function PartTabFactory($q, $timeout, _) {
    return function (list, type, $scope) {
      return new PartTab(list, type, $scope, $q, $timeout, _);
    };
  }

  function PartTab(list, type, $scope, $q, $timeout, _) {
    var tab = this;

    // Public variables
    tab.text = 'hardware.part.list.tab.' + type;
    tab.list = list.filter({
      part_type: type,
    });
    tab.active = false;

    // Public methods
    tab.syncChanges = syncChanges;

    // Private functions
    function syncChanges() {
      return $q.all(
        _(tab.list.items)
          .map(syncPart)
          .filter()
          .value()
      );
    }

    function syncPart(item) {
      var formData = {
        name: item.name,
        billing_id: item.billing_id,
        part_type: type,
      };
      var createOpts = {
        reload: false,
      };

      if (!item.id) {
        return tab.list
          .create(formData, createOpts)
          .then(_.assign.bind(_, item))
          .then(queueCleanForm)
          ;
      }

      var formElems = getFormElems(item.id);

      if (!_.some(formElems, '$dirty')) {
        return;
      }

      return item.patch(formData).then(cleanForm);
    }

    function getFormElems(id) {
      return [
        $scope.form[id + '.name'],
        $scope.form[id + '.billing_id'],
      ];
    }

    function cleanForm(response) {
      _.invokeMap(getFormElems(response.id), '$setPristine');

      return response;
    }

    function queueCleanForm(response) {
      $timeout(cleanForm.bind(null, response));

      return response;
    }
  }
})();
