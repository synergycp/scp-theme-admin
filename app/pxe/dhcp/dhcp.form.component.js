(function () {
    'use strict';

    var INPUTS = {
        name: '',
        http: {
            host: '',
            port: '',
            use_https: false,
            api_key: ''
        }
    };

    angular
        .module('app.pxe')
        .component('pxeDhcpForm', {
            require: {},
            bindings: {
                form: '=',
            },
            controller: 'PxeDhcpFormCtrl as pxeDhcpForm',
            transclude: true,
            templateUrl: 'app/pxe/dhcp/dhcp.form.html'
        })
        .controller('PxeDhcpFormCtrl', PxeDhcpFormCtrl)
    ;

    /**
     * @ngInject
     */
    function PxeDhcpFormCtrl(Select, $scope, _, $rootScope) {
        var pxeDhcpForm = this;

        pxeDhcpForm.$onInit = init;
        pxeDhcpForm.input = _.clone(INPUTS);

        //////////

        function init() {
            pxeDhcpForm.form.getData = getData;

            if (pxeDhcpForm.form.on) {
                pxeDhcpForm.form
                    .on('load', storeState)
                    .on('change', storeState)
                ;
            }
        }

        function fillFormInputs() {
            _.overwrite(pxeDhcpForm.input, pxeDhcpForm.form.input);
        }

        function storeState(response) {
            $rootScope.$evalAsync(function () {
                fillFormInputs();
            });
        }

        function getData() {
            var data = _.clone(pxeDhcpForm.input);

            return data;
        }
    }
})();
