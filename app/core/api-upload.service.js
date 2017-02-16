(function () {
  'use strict';

  angular
    .module('app.core')
    .service('ApiUpload', ApiUpload)
  ;

  /**
   * @ngInject-
   */
  function ApiUpload(Api, ApiKey, Upload, $timeout) {
    var ApiUpload = this;

    ApiUpload.post = upload.bind(null, 'POST');
    ApiUpload.patch = upload.bind(null, 'PATCH');
    ApiUpload.delete = upload.bind(null, 'DELETE');

    //////////

    function upload(method, url, file, data) {
      url = Api.baseUrl() + 'api/' + url + '?key=' + ApiKey.get();
      data._method = method; // Laravel bug handling multipart/form-data w/ PATCH
      file.upload = Upload.upload({
        url: url,
        method: 'POST',
        data: data,
        headers: {
        //  'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return file.upload.then(function (response) {
        Api.showMessagesFrom(response);
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0) {
          Api.showMessagesFrom(response);
        }
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      });
    }
  }

})();
