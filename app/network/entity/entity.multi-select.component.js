(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .component('entityMultiSelect', {
      require: {
      },
      bindings: {
        select: '=',
        placeholder: '@',
      },
      controller: 'EntityMultiSelectCtrl as select',
      transclude: true,
      templateUrl: 'app/network/entity/entity.multi-select.html'
    })
    .controller('EntityMultiSelectCtrl', EntityMultiSelectCtrl)
    ;

  /**
   * @ngInject
   */
  function EntityMultiSelectCtrl() {
    var select = this;

    select.$onInit = init;

    //////////

    function init() {
    }
  }
})();
