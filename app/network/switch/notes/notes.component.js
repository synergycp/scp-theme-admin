(function () {
  'use strict';

  angular
    .module('app.network.switch')
    .component('switchNotes', {
      require: {
      },
      bindings: {
        switch: '=',
      },
      controller: 'SwitchNotesCtrl as notes',
      transclude: true,
      templateUrl: 'app/network/switch/notes/notes.html'
    })
    .controller('SwitchNotesCtrl', SwitchNotesCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchNotesCtrl(Loader) {
    var notes = this;

    notes.isExpanded = false;
    notes.loader = Loader();

    notes.$onInit = init;
    notes.save = save;

    //////////

    function init() {
      notes.isExpanded = !!notes.switch.admin_notes;
    }

    function save() {
      var data = {
        admin_notes: notes.switch.admin_notes,
      };

      return notes.loader.during(
        notes.switch.patch(data)
      );
    }
  }
})();
