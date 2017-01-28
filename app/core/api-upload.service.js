(function () {
  'use strict';

  angular
    .module('app.core')
    .service('ApiUpload', ApiUploadService)
    ;

  /**
   * @ngInject
   */
  function ApiUploadService(Upload, $timeout) {
    var ApiUploadService = this;

    ApiUploadService.post = post;
    ApiUploadService.patch = patch;
    ApiUploadService.delete = del;

    //////////

    function post(url, file, data) {
      return upload(url, file, data, 'POST');
    }

    function patch() {
      return upload(url, file, data, 'PATCH');      
    }

    function del() {
      return upload(url, file, data, 'DELETE');
    }

    function upload(url, file, data, method) {   
      file.upload = Upload.upload({
          url: url,
          method: method,
          data: data
      });

      return file.upload.then(function (response) {
          $timeout(function () {
              file.result = response.data;
          });
      }, function (response) {
          if (response.status > 0)
              console.error('err', response)
      }, function (evt) {
          file.progress = Math.min(100, parseInt(100.0 * 
                                   evt.loaded / evt.total));
      });
    }
  }

})();
