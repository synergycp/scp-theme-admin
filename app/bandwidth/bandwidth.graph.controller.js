(function () {
  'use strict';

  angular
    .module('app.bandwidth')
    .controller('BandwidthGraphCtrl', BandwidthGraphCtrl)
    ;

  /**
   * BandwidthGraph Controller
   *
   * @ngInject
   */
  function BandwidthGraphCtrl() {
    var vm = this;

    vm.$onInit = activate;

    //////////

    function activate() {
      
    }
  }
})();
