(function () {
    'use strict';

    var STEPS = {
        INSTALL: 'INSTALL',
        CREATE: 'CREATE',
    };
    angular
        .module('app.network.forward.gateway')
        .component('forwardGatewayCreateWizard', {
            require: {},
            bindings: {
                form: '=',
            },
            controller: 'ForwardGatewayCreateWizardCtrl as wizard',
            templateUrl: 'app/network/forward/gateway/gateway.create.wizard.html'
        })
        .controller('ForwardGatewayCreateWizardCtrl', ForwardGatewayCreateWizardCtrl)
    ;

    /**
     * @ngInject
     */
    function ForwardGatewayCreateWizardCtrl() {
        var wizard = this;

        wizard.$onInit = init;
        wizard.STEPS = STEPS;
        wizard.step = STEPS.INSTALL;

        //////////

        function init() {
        }
    }
})();
