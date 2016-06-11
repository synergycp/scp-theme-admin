(function () {
  'use strict';

  angular
    .module('app.hardware.switch.speed')
    .controller('SpeedModalMergeCtrl', SpeedModalMergeCtrl)
    ;

  /**
   * SpeedModalMerge Controller
   *
   * @ngInject
   */
  function SpeedModalMergeCtrl(Select, Alert, items) {
    var modal = this;

    modal.speed = Select('port-speed').filter({
      'id_not_in[]': _.map(items, 'id'),
    });
    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      if (!modal.speed.selected) {
        Alert.warning('Please select a Switch Port Speed to merge with');

        return;
      }

      return modal.$close(modal.speed.selected);
    }
  }
})();
