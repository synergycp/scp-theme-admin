(function () {
  'use strict';

  angular
    .module('app.system.package')
    .component('packageStatusCard', {
      require: {},
      bindings: {
        package: '=',
      },
      controller: 'PackageStatusCardCtrl as status',
      transclude: true,
      templateUrl: 'app/system/package/package.status.card.html'
    })
    .controller('PackageStatusCardCtrl', PackageStatusCardCtrl);

  /**
   * @ngInject
   */
  function PackageStatusCardCtrl(Loader, _, Modal) {
    var status = this;

    status.loader = Loader();
    status.$onInit = init;
    status.toggleState = toggleState;
    status.toggledStateName = toggledStateName;

    //////////

    function init() {}

    function toggledStateName() {
      return status.package.status === 'ENABLED' ? 'DISABLED' : 'ENABLED';
    }

    function toggleState() {
      var newStatus = toggledStateName();
      return status.loader.during(
        Modal.confirm([status.package], 'package.edit.status.modal.'+newStatus)
          .data({
            submitClass: toggledStateName() === 'ENABLED' ? 'btn-success' : 'btn-warning',
          })
          .open()
          .result
          .then(function () {
            return status.package.patch({
              status: newStatus,
            }).then(function (result) {
              _.assign(status.package, result);
            })
          })
      );
    }
  }
})();
