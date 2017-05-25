(function () {
  'use strict';

  var INPUTS = {
    name: '',
    group: '',
    http: {
      host: '',
      port: '',
      use_https: false,
      api_key: ''
    }
  };

  angular
    .module('app.pxe')
    .component('pxeServerForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'PxeServerFormCtrl as pxeServerForm',
      transclude: true,
      templateUrl: 'app/pxe/dhcp/dhcp.form.html'
    })
    .controller('PxeServerFormCtrl', PxeServerFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PxeServerFormCtrl(Select, $scope, _, $rootScope) {
    var pxeServerForm = this;

    pxeServerForm.$onInit = init;
    pxeServerForm.input = _.clone(INPUTS);
    pxeServerForm.groups = Select('group');

    //////////

    function init() {
      pxeServerForm.form.getData = getData;

      if (pxeServerForm.form.on) {
        pxeServerForm.form
          .on('load', storeState)
          .on('change', storeState)
          ;
      }
    }

    function fillFormInputs() {
      _.overwrite(pxeServerForm.input, pxeServerForm.form.input);
    }

    function storeState(response) {
      $rootScope.$evalAsync(function() {
        fillFormInputs();
        pxeServerForm.groups.selected = response.group;
        // pxeServerForm.groups = pxeServerForm.groups.filter({
        //   'id_not_in[]': response.id
        // })
      });
    }

    function getData() {
      var data = _.clone(pxeServerForm.input);
      data.group = pxeServerForm.groups.getSelected('id') || null;

      return data;
    }
  }
})();
