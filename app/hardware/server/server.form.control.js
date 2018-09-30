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

    control.portForwardingTypes = {
      // The key corresponds to a translation key in server.form.control.forward.type.
      // The value corresponds to the API output by ControlTransformer.
      DISABLED: 'disabled',
      PUBLIC: 'public',
      ACL: 'acl',
    };
    control.input = {
      ip: '',
      admin: {
        username: '',
        password: '',
      },
      client: {
        username: '',
        password: '',
      },
      port_forwarding_type: control.portForwardingTypes.DISABLED,
    };
    control.type = Select('server/control/type');

    control.$setPristine = $setPristine;
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
      control.input.port_forwarding_type = response.port_forwarding_type;

      if (control.type.getSelected('id') != response.type.id) {
        control.type.selected = response.type;
      }
    }
  }
})();

