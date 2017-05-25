(function () {
  'use strict';

  angular
    .module('app.pxe', [
      'scp.angle.layout.list',
      'scp.core.api',
      'app.pxe.install',
      'app.pxe.preseed',
      'app.pxe.profile',
      'app.pxe.shell',
      'app.pxe.boot',
      'app.pxe.iso',
      'app.pxe.driver',
      'app.pxe.dhcp',
    ]);
})();
