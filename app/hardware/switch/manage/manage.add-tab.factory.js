(function () {
  'use strict';

  angular
    .module('app.hardware.switch.bandwidth')
    .factory('SwitchManageAddTab', SwitchManageAddTabFactory)
    ;

  /**
   * @ngInject
   */
  function SwitchManageAddTabFactory(Select, EventEmitter, Alert) {
    return function(hub) {
      return new SwitchManageAddTab(
        hub,
        EventEmitter(),
        Select('switch/'+hub.id+'/port').filter({ is_primary: false }),
        Alert
      );
    };
  }

  function SwitchManageAddTab(hub, event, selectPort, Alert) {
    // Private variables
    var tab = this;

    // Public variables
    tab.port = selectPort;

    // Public methods
    tab.submit = submit;

    event.bindTo(tab);

    //////////

    function submit() {
      var port = tab.port.selected;
      if (!port) {
        return Alert.warning('Please select a port to add.');
      }

      if (port.is_primary) {
        return Alert.warning('That port is already a primary port.');
      }

      return port
        .patch({ is_primary: true })
        .then(fireAddEvent)
        .branch()
          .then(refresh)
        .unbranch()
        ;
    }

    function fireAddEvent(port) {
      event.fire('add', port);

      return port;
    }

    function refresh() {
      tab.port.refresh();
      tab.port.selected = null;
    }
  }
})();
