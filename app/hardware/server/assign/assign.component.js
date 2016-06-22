(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverAssign', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerAssignCtrl as assign',
      transclude: true,
      templateUrl: 'app/hardware/server/assign/assign.html'
    })
    .controller('ServerAssignCtrl', ServerAssignCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerAssignCtrl() {
    var assign = this;

    assign.$onInit = init;
    assign.entities = {
      items: [],
    };
    assign.client = {
      modal: assignClientModal,
    };

    //////////

    function init() {
      syncEntities();
    }

    function syncEntities() {
    }

    function assignClientModal() {
    }
  }
})();
