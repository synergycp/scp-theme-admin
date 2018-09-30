(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .component('serverNotes', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerNotesCtrl as notes',
      transclude: true,
      templateUrl: 'app/hardware/server/notes/notes.html'
    })
    .controller('ServerNotesCtrl', ServerNotesCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerNotesCtrl(Loader) {
    var notes = this;

    notes.isExpanded = false;
    notes.loader = Loader();
    //notes.loader.loading();

    notes.$onInit = init;
    notes.save = save;

    //////////

    function init() {
      notes.isExpanded = notes.server.notes.client ||
        notes.server.notes.admin;
    }

    function save() {
      var data = {
        notes: {
          client: notes.server.notes.client,
          admin: notes.server.notes.admin,
        },
      };

      return notes.loader.during(
          notes.server.patch(data)
      );
    }
  }
})();
