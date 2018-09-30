(function () {
  'use strict';

  angular
    .module('app.hardware.server.bandwidth')
    .factory('ServerBandwidthBilling', ServerBandwidthBillingFactory);

  /**
   * ServerBandwidthBilling Factory
   *
   * @ngInject
   */
  function ServerBandwidthBillingFactory () {
    return function () {
        return new ServerBandwidthBilling();
    };
  }

  function ServerBandwidthBilling () {
    var billing = this;

    billing.isActive = false;
    billing.used = 0;
    billing.max = 0;
    billing.cycleStart = '';
    billing.percent = 0;

    //////////
  }
})();
