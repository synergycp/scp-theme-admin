(function () {
  'use strict';

  var ServerConfig = {
    MAX_DISKS: 50,
  };

  angular
    .module('app.hardware.server')
    .constant('ServerConfig', ServerConfig)
    ;
})();
