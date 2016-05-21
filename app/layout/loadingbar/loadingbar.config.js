(function () {
  'use strict';

  angular
    .module('app.layout.loadingbar')
    .config(loadingbarConfig);
  loadingbarConfig.$inject = ['cfpLoadingBarProvider'];

  function loadingbarConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
  }
})();
