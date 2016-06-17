(function () {
  'use strict';

  angular
    .module('app.hardware.part')
    .controller('PartModalMergeCtrl', PartModalMergeCtrl)
    ;

  /**
   * SpeedModalMerge Controller
   *
   * @ngInject
   */
  function PartModalMergeCtrl(Select, Alert, items) {
    var modal = this;

    modal.part = Select('part').filter({
      'id_not_in[]': _.map(items, 'id'),
      part_type: items[0].part_type.id,
    });
    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      if (!modal.part.selected) {
        Alert.warning('Please select a Part to merge with');

        return;
      }

      return modal.$close(modal.part.selected);
    }
  }
})();
