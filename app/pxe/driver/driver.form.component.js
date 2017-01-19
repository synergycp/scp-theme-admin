(function () {
  'use strict';

  var INPUTS = {
    name: '',
    path: '',
  };

  angular
    .module('app.pxe')
    .component('pxeDriverForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'PxeDriverFormCtrl as pxeDriverForm',
      transclude: true,
      templateUrl: 'app/pxe/driver/driver.form.html'
    })
    .controller('PxeDriverFormCtrl', PxeDriverFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PxeDriverFormCtrl(Select, $scope, _) {
    var pxeDriverForm = this;

    pxeDriverForm.$onInit = init;
    pxeDriverForm.input = _.clone(INPUTS);

    //////////

    function init() {
      pxeDriverForm.form.getData = getData;
      if (pxeDriverForm.form.loader && !pxeDriverForm.form.loader.active) {
        syncResponse(pxeDriverForm.form.input);
      }

      (pxeDriverForm.form.on || function() {})(['change', 'load'], syncResponse);
    }

    function syncResponse(response) {
      _.overwrite(pxeDriverForm.input, pxeDriverForm.form.input);
    }

    function getData() {
      var data = _.clone(pxeDriverForm.input);

      return data;
    }
  }
})();
