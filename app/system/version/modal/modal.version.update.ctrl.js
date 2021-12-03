(function () {
  "use strict";

  angular
    .module("app.system.version")
    .controller("SystemVersionModalUpdateCtrl", SystemVersionModalUpdateCtrl);

  /**
   * @ngInject
   * @param VersionService
   * @constructor
   */
  function SystemVersionModalUpdateCtrl(
    VersionService,
    $q,
    $scope,
    _,
    Api,
    $translate,
    Alert,
    Loader
  ) {
    var modal = this;
    modal.lang = "version.modal.update";
    modal.data = {
      submitClass: "btn-primary",
    };
  }
})();
