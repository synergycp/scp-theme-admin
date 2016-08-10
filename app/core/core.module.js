(function () {
  'use strict';

  angular
    .module('app.core', [
      'ngCookies',
      'ngAnimate',
      'ngStorage',
      'ngSanitize',
      'pascalprecht.translate',
      'ui.bootstrap',
      'ui.router',
      'oc.lazyLoad',
      'cfp.loadingBar',
      'ngSanitize',
      'ui.utils',
      'ngAria',
      'ngMessages',
      'restangular',
      'app.core.colors',
      'app.core.lazyload',
      'app.core.preloader',
      'app.core.routes',
      'app.core.settings',
      'app.core.translate',
      'app.core.mixins',
      'app.core.filters',
    ]);
})();
