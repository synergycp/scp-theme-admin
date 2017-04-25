(function () {
  'use strict';

  angular
    .module('app.network.switch.port')
    .component('switchPorts', {
      require: {
      },
      bindings: {
        switch: '=',
      },
      controller: 'SwitchPortListCtrl as ports',
      transclude: true,
      templateUrl: 'app/network/switch/port/port.list.html'
    })
    .controller('SwitchPortListCtrl', SwitchPortListCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchPortListCtrl(List, ListFilter) {
    var ports = this;

    ports.$onInit = init;

    //////////

    function init() {
      ports.list = List('switch/'+ports.switch.id+'/port');
      ports.list.load();
      ports.filters = ListFilter(ports.list);
    }
  }
})();
