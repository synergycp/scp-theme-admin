(function () {
  'use strict';

  angular
    .module('app.hardware.switch.modal')
    .service('SwitchModal', SwitchModalService);

  /**
   * SwitchModal Service
   *
   * @ngInject
   */
  function SwitchModalService (Api, $uibModal) {
    var SwitchModal = this;
    var $api = Api.all('switch');

    SwitchModal.delete = remove;

    //////////

    function remove(targets) {
      var modal = $uibModal.open({
        templateUrl: 'app/hardware/switch/modal/modal.delete.html',
        controller: 'SwitchModalDeleteCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          targets: function () {
            return targets;
          },
        },
      });

      return modal.result
        .then($bulk(targets).remove);
    }

    function $bulk(targets) {
      var targetIds = _.map(targets, 'id').join(',');

      return $api.one(targetIds);
    }
  }
})();
