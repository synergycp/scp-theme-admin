(function () {
  'use strict';

  angular
    .module('app.core')
    .config(httpConfig)
    .config(coreConfig);


  /**
   * @ngInject
   */
   function coreConfig($compileProvider, $animateProvider, $locationProvider) {
    // Disable debug info for performance boost.
    $compileProvider.debugInfoEnabled(false);

    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);
  }


  /**
   * @ngInject
   */
   function httpConfig($httpProvider) {
    var regex = (/\.(html|json)$/i);
    var versions = window.FILES_VERSIONS || {};
    $httpProvider.interceptors.push(function($q) {
      return {
       'request': function(config) {
           if(versions[config.url]) {
            config.url = versions[config.url]
           }
           return config;
        }
      };
    });
  }

})();
