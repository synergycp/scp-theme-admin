(function () {
    'use strict';

    var INPUTS = {
        name: '',
        hostname: '',
        port: 3000,
        api_key: '',
    };

    angular
        .module('app.network.console.server')
        .component('consoleServerForm', {
            require: {},
            bindings: {
                isCreating: '@',
                form: '=',
            },
            controller: 'ConsoleServerFormCtrl as consoleServerForm',
            transclude: true,
            templateUrl: 'app/network/console/server/server.form.html'
        })
        .controller('ConsoleServerFormCtrl', ConsoleServerFormCtrl)
    ;

    /**
     * @ngInject
     */
    function ConsoleServerFormCtrl(Select, _, $rootScope) {
        var consoleServerForm = this;

        consoleServerForm.$onInit = init;
        consoleServerForm.server = {};
        consoleServerForm.input = _.clone(INPUTS);
        consoleServerForm.groups = Select('group').multi();

        function init() {
            consoleServerForm.form.getData = getData;

            if (consoleServerForm.form.on) {
                consoleServerForm.form.on(['change', 'load'], storeState);
            }
        }

        function fillFormInputs() {
            _.assign(consoleServerForm.server, consoleServerForm.form.input);
            _.overwrite(consoleServerForm.input, consoleServerForm.form.input);
        }

        function storeState(response) {
            $rootScope.$evalAsync(function() {
                fillFormInputs();
            });
            _.setContents(consoleServerForm.groups.selected, response.groups);
        }

        function getData() {
            var data = _.clone(consoleServerForm.input);
            data.groups = _.map(consoleServerForm.groups.selected, 'id');
            return data;
        }
    }
})();
