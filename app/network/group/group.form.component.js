(function () {
    'use strict';

    var INPUTS = {
        name: '',
        billing_id: '',
        reserved: false,
        pxe_dhcp_server: ''
    };

    angular
        .module('app.network')
        .component('groupForm', {
            require: {},
            bindings: {
                form: '=',
            },
            controller: 'GroupFormCtrl as groupForm',
            transclude: true,
            templateUrl: 'app/network/group/group.form.html'
        })
        .controller('GroupFormCtrl', GroupFormCtrl)
    ;

    /**
     * @ngInject
     */
    function GroupFormCtrl(Select, Todo, _, $rootScope) {
        var groupForm = this;

        groupForm.$onInit = init;
        groupForm.input = _.clone(INPUTS);
        groupForm.dhcp = Select('pxe/dhcp');

        //////////

        function init() {
            groupForm.form.getData = getData;

            if (groupForm.form.on) {
                groupForm.form
                    .on('load', storeState)
                    .on('change', storeState)
                    .on('create', Todo.refresh)
                ;
            }
        }

        function fillFormInputs() {
            _.overwrite(groupForm.input, groupForm.form.input);
        }

        function storeState(response) {
            $rootScope.$evalAsync(function() {
                fillFormInputs();
                groupForm.dhcp.selected = response.pxe_dhcp_server;
            });
        }

        function getData() {
            var data = _.clone(groupForm.input);
            data.pxe_dhcp_server = groupForm.dhcp.selected || null;

            return data;
        }
    }
})();
