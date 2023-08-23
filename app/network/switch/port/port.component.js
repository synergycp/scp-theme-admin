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
  function SwitchPortListCtrl(List, ListFilter, $scope, PortModal, PortBulk) {
    var ports = this;

    ports.$onInit = init;



    ports.createPort = openCreatePortModal;
    //////////

    function openCreatePortModal() {
      PortModal.create(ports.switch.id)
        .open()
        .result
        .then(function (port) {
          ports.list.refresh.now();
        })
        .catch(function () {
        });


    };

    function init() {
      ports.list = List('switch/'+ports.switch.id+'/port')
        .setPaginationAndSortToUrl();
      ports.list.load();
      ports.filters = ListFilter(ports.list);
      PortBulk(ports.list);
      $scope.$on('$destroy', onDestroy);
    }

    function onDestroy() {
      ports.list.clearPaginationAndSortFromUrl();
    }
  }
})();
