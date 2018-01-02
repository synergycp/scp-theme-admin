(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .factory('ServerFormControl', ControlFactory)
  ;

  /**
   * @ngInject
   * @constructor
   */
  function ControlFactory(Select) {
    return function () {
      return new Control(Select);
    };
  }

  /**
   * @constructor
   */
  function Control(Select) {
    var control = this;

    control.input = {
      ip: '',
      admin: {
        username: '',
        password: '',
      },
      client: {
        username: '',
        password: '',
      }
    };
    control.type = Select('server/control/type');

    control.$setPristine = $setPristine;
    control.data = data;
    control.fromExisting = fromExisting;

    function $setPristine() {
      control.type.$dirty = false;
    }

    function fromExisting(response) {
      control.id = response.id;
      control.input.ip = response.ip;
      control.original = response;
      control.input.client.username = response.client_user;
      control.input.client.password = response.client_password;
      control.input.admin.username = response.admin_user;
      control.input.admin.password = response.admin_password;      

      if (control.type.getSelected('id') != response.type.id) {
        control.type.selected = response.type;
      }
    }

    
    function data() {
      // TODO: looks like this isn't used anywhere? verify and remove.
      return {
        id: control.id,
        ip: control.input.mac,
        client_user: control.input.client.username, 
        client_password: control.input.client.password, 
        admin_user: control.input.admin.username, 
        admin_password: control.input.admin.password, 
        type: control.type.getSelected('id'),
      };
    }
  }
})();

