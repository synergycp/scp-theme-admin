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
  function PxeDriverFormCtrl(Select, $scope, _, Upload, $timeout, Api, ApiKey) {
    var pxeDriverForm = this;

    pxeDriverForm.$onInit = init;
    pxeDriverForm.input = _.clone(INPUTS);

    pxeDriverForm.uploadFiles = function(file, errFiles) {
      // var api = Api('pxe/driver');
      $scope.f = file;
      $scope.errFile = errFiles && errFiles[0];
      if (file) {
          file.upload = Upload.upload({
              url: Api.baseUrl()+'api/pxe/driver?key='+ApiKey.get(),
              method: 'post',
              data: {
                driver: file,
                name: "Test",
                path: 'localhost'
              }
          });

          file.upload.then(function (response) {
              $timeout(function () {
                  file.result = response.data;
              });
          }, function (response) {
              if (response.status > 0)
                  $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
              file.progress = Math.min(100, parseInt(100.0 * 
                                       evt.loaded / evt.total));
          });
      }   
    }

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
