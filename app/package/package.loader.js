(function () {
  'use strict';

  angular
    .module('app.package')
    .run(PackageLoader)
    ;

  /**
   * @ngInject
   */
  function PackageLoader(Api, $ocLazyLoad) {
    var loader = this;
    var $api = Api.all('package/angular');

    activate();

    ///////////

    function activate() {
      $api.getList()
        .then(loadFiles);
    }

    function loadFiles(packages) {
      var files = _(packages).map('files').flatten().value();

      $ocLazyLoad.load(files);
    }
  }
})();
