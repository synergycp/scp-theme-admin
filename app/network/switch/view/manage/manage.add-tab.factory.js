(function () {
  'use strict';

  angular
    .module('app.network.switch.view.manage')
    .factory('SwitchManageAddTab', SwitchManageAddTabFactory)
    ;

  /**
   * @ngInject
   */
  function SwitchManageAddTabFactory(Select, EventEmitter, Alert) {
    return function(sw) {
      return new SwitchManageAddTab(
        sw,
        EventEmitter(),
        Select('switch/'+sw.id+'/port').filter({ is_switch_primary: false }),
        Alert
      );
    };
  }

  function SwitchManageAddTab(sw, event, selectPort, Alert) {
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

      if (port.is_switch_primary) {
        return Alert.warning('That port is already a primary port.');
      }

      return port
        .patch({ is_switch_primary: true })
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
