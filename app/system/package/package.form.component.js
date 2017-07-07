(function () {
  'use strict';

  var INPUTS = {
    name: '',
  };

  angular
    .module('app.pxe')
    .component('packageForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'PackageFormCtrl as packageForm',
      transclude: true,
      templateUrl: 'app/system/package/package.form.html'
    })
    .controller('PackageFormCtrl', PackageFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PackageFormCtrl(Select, $scope, _) {
    var packageForm = this;

    packageForm.$onInit = init;
    packageForm.input = _.clone(INPUTS);
    packageForm.driver = null;

    //////////

    function init() {
      packageForm.form.getData = getData;
      if (packageForm.form.loader && !packageForm.form.loader.active) {
        syncResponse(packageForm.form.input);
      }

      (packageForm.form.on || function() {})(['change', 'load'], syncResponse);
    }

    function syncResponse(response) {
      _.overwrite(packageForm.input, packageForm.form.input);
    }

    function getData() {
      var data = _.clone(packageForm.input);
      data.driver = packageForm.driver;

      return data;
    }
  }
})();
