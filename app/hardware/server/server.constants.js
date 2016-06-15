(function () {
  'use strict';

  var ServerConfig = {
    MAX_DISKS: 8,
  };

  angular
    .module('app.hardware.server')
    .constant('ServerConfig', ServerConfig)
    ;
})();
