(function () {
    'use strict';

    angular
        .module('app.network.gateway', [
            'scp.core.api',
            'ui.select',
            'scp.angle.layout.list',
            'app.network.gateway.list',
        ]);
})();
