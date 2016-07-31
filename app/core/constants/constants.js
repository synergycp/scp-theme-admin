(function () {
  'use strict';

  angular
    .module('app.core.constants')
    .constant('APP_MEDIAQUERY', {
      'desktopLG': 1200,
      'desktop': 992,
      'tablet': 768,
      'mobile': 480
    })
    .constant('_', _)
    .factory('moment', momentFactory)
    .factory('numeral', numeralFactory)
    ;

  /**
   * @ngInject
   */
  function momentFactory($window) {
    return $window.moment;
  }

  /**
   * @ngInject
   */
  function numeralFactory($window) {
    return $window.numeral;
  }

})();
