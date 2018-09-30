(function () {
  'use strict';

  var API = {
    edition: 'pxe/iso/{{ isoId }}/edition',
  };

  angular
    .module('app.pxe')
    .component('editionList', {
      require: {
      },
      bindings: {
        isoId: '=',
        isoName: '=',
        onChange: '&?',
      },
      controller: 'EditionIndexCtrl as editionList',
      transclude: true,
      templateUrl: 'app/pxe/iso/edition/edition.list.html',
    })
    .controller('EditionIndexCtrl', EditionIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function EditionIndexCtrl(List, $scope, $q) {
    var editionList = this;

    editionList.$onInit = init;
    editionList.submit = submit;

    //////////

    function init() {
      editionList.list = List(
        API.edition.replace('{{ isoId }}', editionList.isoId)
      );
      editionList.list.load();
    }

    function submit() {
      return $q.all(
        _(editionList.list.items)
          .filter(isDirty)
          .map(patchChanges)
          .value()
      ).then(fireChangeEvent);
    }

    function fireChangeEvent() {
      (editionList.onChange || angular.noop)();
    }

    function isDirty(edition) {
      return _.some(formElems(edition.id), '$dirty');
    }

    function patchChanges(edition) {
      return editionList.list.patch([edition], {
        is_enabled: edition.is_enabled,
        license_key: edition.key,
      }).then(markClean);

      function markClean(response) {
        _.invokeMap(formElems(response.id), '$setPristine');

        return response;
      }
    }

    function formElems(editionId) {
      return [
        $scope.form[editionId+'.is_enabled'],
        $scope.form[editionId+'.key'],
      ];
    }
  }
})();
