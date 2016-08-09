(function () {
  'use strict';

  angular
    .module('app.core.filters')
    .filter('bitsToSize', bitsToSizeFactory)
    ;

  /**
   * @ngInject
   */
  function bitsToSizeFactory (numeral) {
    return function (num) {
      return numeral(num*1.1).format('0,0b');
    };
  }
})();
